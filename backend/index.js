const express=require('express')
const dotenv=require('dotenv').config();
const port=process.env.PORT||5000;
const connectDB = require('./config/db');
const {errorHandler}=require('./middleware/ErrorMiddleware')
const cors=require('cors')
const multer = require('multer');
const path = require('path');
const { put } = require('@vercel/blob');



connectDB();
const app=express();
//middleware
  app.use(cors({ origin: 'https://ecom-store-9ttd.vercel.app' }))
// app.use(cors({ origin: 'http://localhost:3000' }))

// http://localhost:3000
app.use(express.json());
app.use(express.urlencoded({extended:false}));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../frontend/public/assets')); // Set the destination folder
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

const absolutePath = path.resolve(__dirname, '../frontend/public/assets');
app.use('/assets', express.static(absolutePath));

// Image upload endpoint
app.post('/api/upload', upload.single('myFile'),async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // const filePath = path.join('../frontend/src/assets', req.file.filename); // Relative path for frontend
//   const filePath = `/assets/${req.file.filename}`; 

//   console.log('Uploaded file:', req.file);
//   console.log(filePath);
//   res.status(200).json({ message: 'File uploaded successfully', filePath });
// });
try {
  // Use Vercel Blob API to upload the file
  const blob = await put(req.file.originalname, req.file.buffer, {
    access: 'public', // Make the file publicly accessible
  });

  console.log('Uploaded blob:', blob);
  res.status(200).json({ message: 'File uploaded successfully', blob });
} catch (error) {
  console.error('Blob upload error:', error);
  res.status(500).json({ message: 'Failed to upload file', error: error.message });
}
});

// // Endpoint to view uploaded images (for testing purposes)
// app.get('/api/images', (req, res) => {
//   let html = imagesArray
//     .map((image) => `<img src="/${image}" alt="Uploaded Image" style="width:100px; height:auto;">`)
//     .join('');
//   res.send(`<div>${html}</div>`);
// });

// app.use('/assets', express.static(path.join(__dirname, 'frontend','src')));


app.use(errorHandler);
app.listen(port,()=>console.log(`server started on port ${port}`));
