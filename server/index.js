import express from 'express';
import cors from 'cors';
import multer from 'multer'; 
import path from 'path';    
import fs from 'fs';       

const app = express();
const PORT = 3001;


// http://localhost:3001/uploads/image.jpg  Access
app.use('/uploads', express.static('uploads'));

app.use(cors({ origin: 'http://localhost:3000' }));



const DB_PATH = path.join(process.cwd(), 'listings.json');

function readDb() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('New start, Remind all the work are not saving'); // Not saving
    return [];
  }
}


function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

let listings = readDb();



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {

    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


app.get('/api/listings', (req, res) => {
  console.log('GET /api/listings requested (reply cur_ itemlist)');
  res.json(listings);
});


app.post('/api/listings', upload.single('image'), (req, res) => {
  const textData = req.body;
  const imageFile = req.file;

  console.log(`POST /api/listings request testing: "${textData.title}"`);
  console.log(`   FIle saved: ${imageFile.path}`);

  const newListing = {
    ...textData,
    id: textData.id || Date.now(),
    // ⬇️ (수정) 하드코딩된 localhost 대신, 배포 주소 또는 상대 경로를 고려해야 하지만,
    //    우선은 로컬 개발을 위해 localhost를 유지합니다.
    image: `http://localhost:3001/${imageFile.path.replace(/\\/g, '/')}`, 
    
    // ⬇️ (수정!) FormData는 모든 값을 문자열로 보내므로, 올바르게 파싱(Parsing)합니다.
    credits: Number(textData.credits) || 0,
    isBarter: textData.isBarter === 'true', // "true" 문자열을 boolean true로 변환
    tags: JSON.parse(textData.tags || '[]'), // "['Textbook']" 문자열을 배열로 변환
    views: Number(textData.views) || 0,
    
    // ⬇️ (수정!) seller 객체를 FormData의 평평한 데이터로부터 재조립합니다.
    seller: {
      name: textData.sellerName,
      verified: textData.sellerVerified === 'true'
    },
  };


  listings.unshift(newListing);
  

  writeDb(listings);

  res.status(201).json(newListing);
});



app.listen(PORT, () => {
  console.log(`Backend testing http://localhost:${PORT} is working well`);
  console.log(`        /uploads folder is working`);
  console.log(`        DB: ${DB_PATH}`);
  console.log(`        ${listings.length} itemes are loaded.`);
});