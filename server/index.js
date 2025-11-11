import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createServer } from 'http'; 
import { Server } from 'socket.io'; 
import bcrypt from 'bcrypt'; // adding login system

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
    
    console.log(`[SERVER] 'snagItem' 이벤트를 받음! 데이터:`, data);

    const { sellerId, buyerName, itemName } = data;
    
    // --- (새로 추가!) 알림 저장 로직 ---
    // 1. DB에서 판매자 유저를 찾습니다.
    const seller = usersDb[sellerId];
    if (!seller) {
      console.log(`[SERVER] DB 오류: 판매자 ${sellerId}를 users.json에서 찾을 수 없습니다.`);
      return; // 함수 종료
    }

    // 2. 새 알림 객체를 만듭니다.
    const newNotification = {
      id: Date.now(),
      type: 'snag', // (나중에 'barter' 등 다른 타입 추가 가능)
      title: 'Your item was snagged!',
      message: `${buyerName} wants to snag your "${itemName}"!`,
      time: 'Just now',
      unread: true
    };

    // 3. 판매자의 알림 배열에 이 알림을 추가합니다 (없으면 생성)
    if (!seller.notifications) {
      seller.notifications = [];
    }
    seller.notifications.unshift(newNotification); // 맨 위에 추가

    // 4. 변경된 usersDb를 파일에 *영구 저장*합니다.
    writeUsersDb(usersDb);
    console.log(`[SERVER] 알림이 ${sellerId}의 users.json에 *저장됨*.`);
    // --- (저장 로직 끝) ---


    // --- (기존) 실시간 전송 로직 ---
    // 5. 이제, 판매자가 *온라인 상태*인지 확인합니다.
    const sellerSocketId = connectedUsers[sellerId];

    if (sellerSocketId) {
      // 6. (온라인이면) 방금 저장한 그 알림을 실시간으로도 보냅니다.
      io.to(sellerSocketId).emit('newNotification', newNotification);
      console.log(`[SERVER] 실시간 알림 전송 성공: ${sellerId}`);
    } else {
      // 7. (오프라인이면) 전송은 건너뜁니다. (이미 저장되었음)
      console.log(`[SERVER] 판매자 ${sellerId}가 오프라인입니다. (알림은 저장됨)`);
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
app.use(express.json()); 


const LISTINGS_DB_PATH = path.join(process.cwd(), 'listings.json'); 
const USERS_DB_PATH = path.join(process.cwd(), 'users.json');


function readListingsDb() { 
  try {
    const data = fs.readFileSync(LISTINGS_DB_PATH, 'utf8'); 
    return JSON.parse(data);
  } catch (error) {
    console.log('listings.json을 찾을 수 없어 새로 시작합니다.');
    return [];
  }
}
function writeListingsDb(data) { 
  fs.writeFileSync(LISTINGS_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}


function readUsersDb() {
  try {
    const data = fs.readFileSync(USERS_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}
function writeUsersDb(data) {
  fs.writeFileSync(USERS_DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}


let listings = readListingsDb(); 
let usersDb = readUsersDb();    

// adding login system
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  // 1. 이메일 중복 확인
  const emailExists = Object.values(usersDb).find(user => user.email === email);
  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // 2. 비밀번호 암호화
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // 3. 새 유저 생성 (예: user_3)
  const newUserId = `user_${Object.keys(usersDb).length + 1}`;
  const newUser = {
    id: newUserId,
    name: name,
    email: email,
    password: hashedPassword,
    followedCircles: []
  };

  // 4. DB에 저장
  usersDb[newUserId] = newUser;
  writeUsersDb(usersDb);
  
  console.log(`POST /api/auth/register: '${name}'님 회원가입 성공`);
  // 5. 로그인 성공과 동일하게, 새 유저 객체 반환
  res.status(201).json(newUser);
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. 이메일로 유저 찾기
  const user = Object.values(usersDb).find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // 2. 비밀번호 비교
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // 3. 로그인 성공!
  console.log(`POST /api/auth/login: '${user.name}'님 로그인 성공`);
  // 4. (토큰 대신) 유저 객체 전체를 반환
  res.json(user);
});

///////////////////////////////////////////
app.get('/api/users/:userId', (req, res) => {
  const { userId } = req.params;
  
  if (usersDb[userId]) {
    // 유저가 DB에 있으면
    console.log(`GET /api/users: '${userId}' 정보 전송`);
    res.json(usersDb[userId]);
  } else {
    // 유저가 DB에 없으면 (예: user_4), 새로 만들어서 저장
    console.log(`GET /api/users: '${userId}' 찾을 수 없어 새로 생성`);
    
    const newUser = {
      id: userId,
      name: 'New User',
      followedCircles: []
    };
    usersDb[userId] = newUser;
    writeUsersDb(usersDb); // 파일에 즉시 저장
    res.json(newUser);
  }
});

app.post('/api/users/follows/toggle', (req, res) => {
  const { userId, circleId } = req.body; 
  
  const user = usersDb[userId]; 
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const index = user.followedCircles.indexOf(circleId);
  if (index > -1) {
    // unfollow
    user.followedCircles.splice(index, 1);
    console.log(`POST /follows/toggle: '${userId}'가 '${circleId}' unfollow`);
  } else {
    // follow
    user.followedCircles.push(circleId);
    console.log(`POST /follows/toggle: '${userId}'가 '${circleId}' follow`);
  }

  writeUsersDb(usersDb); 
  res.json(user); 
});

app.post('/api/users/profile', (req, res) => {
  const { userId, newName } = req.body; // { userId: 'user_1', newName: 'Ryan M.' }
  
  const user = usersDb[userId];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = newName; 
  writeUsersDb(usersDb); 

  console.log(`POST /api/users/profile: '${userId}'-> '${newName}';;;`);
  res.json(user); 
});

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
  
  writeListingsDb(listings); 

  io.emit('newListing', newListing); 

  res.status(201).json(newListing);
});




httpServer.listen(PORT, () => {
  console.log(`backend : http://localhost:${PORT} works!.`);
  console.log(`Listings DB: ${LISTINGS_DB_PATH} (${listings.length} are load`); 
  console.log(`Users DB: ${USERS_DB_PATH} (${Object.keys(usersDb).length} are load)`);
});