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


connectDB();
const app=express();
app.use(bodyParser.json());

//middleware
  // app.use(cors({ origin: 'https://ecom-store-9ttd.vercel.app' }))
  //  app.use(cors({ origin: process.env.CLIENT_URL }))
   app.use(cors({ origin: ' https://www.celebmerch.shop' }))
 
// //   console.log('Allowed CORS origin:', process.env.CLIENT_URL);


// http://localhost:3000
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads')); // Set the destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamp for unique filenames
  },
});

const upload = multer({ storage });
const imagesArray = [];

//routes
app.use('/api/users',require('./Routes/authRoutes'));
app.use('/api/product',require('./Routes/productRoutes'));
app.use('/api/category',require('./Routes/categoryRoutes'));
app.use('/api/cart',require('./Routes/cartRoutes'));
app.use('/api/address',require('./Routes/addressRoutes'));
app.use('/api/order',require('./Routes/orderRoutes'));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Image upload endpoint
app.post('/api/upload', upload.single('myFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  //  const filePath = path.join('/uploads', req.file.filename); // Relative path for frontend
  const filePath = `/uploads/${req.file.filename}`;
  console.log('Uploaded file:', req.file);
  console.log(filePath);
  res.status(200).json({ message: 'File uploaded successfully', filePath });
});

// // Endpoint to view uploaded images (for testing purposes)
// app.get('/api/images', (req, res) => {
//   let html = imagesArray
//     .map((image) => `<img src="/${image}" alt="Uploaded Image" style="width:100px; height:auto;">`)
//     .join('');
//   res.send(`<div>${html}</div>`);
// });

// app.use('/assets', express.static(path.join(__dirname, 'frontend','src')));
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marketease343@gmail.com', // Replace with your Gmail
    pass: 'axus rlmg epax ycrd'   // Use an App Password if you have 2FA enabled
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
