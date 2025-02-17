const express=require('express')
const dotenv=require('dotenv').config();
const port=process.env.PORT||5000;
const connectDB = require('./config/db');
const {errorHandler}=require('./middleware/ErrorMiddleware')
const cors=require('cors')
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require("fs");


connectDB();
const app=express();
app.use(bodyParser.json());

//middleware
   app.use(cors({ origin: 'https://ecom-store-9ttd.vercel.app' }))
  // app.use(cors({ origin: process.env.CLIENT_URL }))
   //app.use(cors({ origin: ' https://www.celebmerch.shop' }))
 
// //   console.log('Allowed CORS origin:', process.env.CLIENT_URL);


app.use(express.json());
app.use(express.urlencoded({extended:false}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp for unique filenames
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only images are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

//routes
app.use('/api/users',require('./Routes/authRoutes'));
app.use('/api/product',require('./Routes/productRoutes'));
app.use('/api/category',require('./Routes/categoryRoutes'));
app.use('/api/cart',require('./Routes/cartRoutes'));
app.use('/api/address',require('./Routes/addressRoutes'));
app.use('/api/order',require('./Routes/orderRoutes'));
app.use('/api/credit-card',require('./Routes/creditcardRoutes'));


app.use('/uploads', express.static(uploadDir));


// Image upload endpoint
app.post('/api/upload', upload.single('myFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = `/uploads/${req.file.filename}`;
  console.log('Uploaded file:', req.file);
  res.status(200).json({ message: 'File uploaded successfully', filePath });
});


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marketease343@gmail.com', 
    pass: process.env.APP_PASS 
  }
});

app.post('/api/send-email', (req, res) => {
  const { firstName, lastName, email, message,phone } = req.body;
  console.log(message);
  console.log(email);
  const mailOptions = {
    from: email,
    to: 'marketease343@gmail.com', 
    subject: 'Customer Support Merge',
    text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});


app.use(errorHandler);
app.listen(port,()=>console.log(`server started on port ${port}`));
