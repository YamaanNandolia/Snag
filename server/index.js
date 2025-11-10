import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 

const app = express();
const PORT = 3001;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
  },
});


let connectedUsers = {};


io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);


  socket.on('register', (data) => {
    const userId = data.userId;
    connectedUsers[userId] = socket.id;
    console.log(`User registered: ${userId} with socket ${socket.id}`);
  });

  socket.on('snagItem', (data) => {
    const { sellerId, buyerName, itemName } = data;
    const sellerSocketId = connectedUsers[sellerId];

    if (sellerSocketId) {

      io.to(sellerSocketId).emit('newNotification', {
        type: 'snag',
        title: 'Your item was snagged!',
        message: `${buyerName} wants to snag your "${itemName}"!`,
      });
      console.log(`Notification sent to seller: ${sellerId}`);
    } else {
      console.log(`Seller ${sellerId} is not connected. Notification not sent.`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);

    Object.keys(connectedUsers).forEach(userId => {
      if (connectedUsers[userId] === socket.id) {
        delete connectedUsers[userId];
        console.log(`User unregistered: ${userId}`);
      }
    });
  });
});

app.use('/uploads', express.static('uploads'));
app.use(cors({ origin: 'http://localhost:3000' }));

const DB_PATH = path.join(process.cwd(), 'listings.json');

function readDb() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('listings.json error');
    return [];
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

let listings = readDb();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage: storage });

app.get('/api/listings', (req, res) => {
  console.log('GET /api/listings request accepted and list sent');
  res.json(listings);
});

app.post('/api/listings', upload.single('image'), (req, res) => {
  const textData = req.body;
  const imageFile = req.file;

  console.log(`POST /api/listings request accepted: "${textData.title}"`);
  console.log(`file saved: ${imageFile.path}`);

  const newListing = {
    id: textData.id || Date.now(),
    status: textData.status,
    views: Number(textData.views) || 0,
    postedTime: textData.postedTime,
    title: textData.title,
    description: textData.description,
    condition: textData.condition,
    meetingSpot: textData.meetingSpot,
    meetingTime: textData.meetingTime,
    image: `http://localhost:3001/${imageFile.path.replace(/\\/g, '/')}`,
    credits: Number(textData.credits) || 0,
    isBarter: textData.isBarter === 'true',
    tags: JSON.parse(textData.tags || '[]'),
    seller: {
      name: textData.sellerName,
      verified: textData.sellerVerified === 'true',
      id: textData.sellerId, 
    },
  };

  listings.unshift(newListing);
  writeDb(listings);
  io.emit('newListing', newListing);
  res.status(201).json(newListing);
});


httpServer.listen(PORT, () => {
  console.log(`backend port :${PORT} works`);
  console.log(`       numofdbfile ${DB_PATH}`);
  console.log(`       ${listings.length} itmes are loaded`);
});