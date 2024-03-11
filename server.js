require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');
const backupDir = './config';
const admin = require('firebase-admin');

//Swagger Implementation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');


const app = express();
const config = require('./config/config'); // Import the configuration

const routes = require('./routes');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

  //   mongoose.connection.on('connected', () => {
  //     console.log('Connected to MongoDB');
  
  //     // Backup command
  //     const backupFileName = `${backupDir}/backup-${new Date().toISOString()}.gz`;
  //     const backupCommand = `mongodump --uri ${config.dbUrl} --archive=${backupFileName} --gzip`;
  
  //     // Execute backup command
  //     exec(backupCommand, (error, stdout, stderr) => {
  //         if (error) {
  //             console.error(`Backup failed: ${error.message}`);
  //             return;
  //         }
  //         console.log(`Backup successful. Backup file: ${backupFileName}`);
  //     });
  // });
  

app.use(routes);

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Adjust the path if needed
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'node-oneday.appspot.com' // Set your storage bucket URL
});

// Access Firebase services here, e.g., Firebase Storage
const bucket = admin.storage().bucket();


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // File info
  const filename = Date.now() + '-' + path.basename(req.file.originalname);
  const file = bucket.file(filename);

  // Create upload stream
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  // Handle upload errors
  stream.on('error', (err) => {
    console.error('Error uploading image:', err);
    res.status(500).json({ error: 'Failed to upload image' });
  });

  // Handle upload completion
  stream.on('finish', () => {
    // Make the image publicly accessible
    file.makePublic().then(() => {
      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      res.json({ imageUrl: imageUrl });
    }).catch((err) => {
      console.error('Error making image public:', err);
      res.status(500).json({ error: 'Failed to upload image' });
    });
  });

  // Pipe the file data to the storage stream
  stream.end(req.file.buffer);
});


app.get('/', (req, res) => {
  res.send('Welcome,to One Day Kitchen');
});

// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
//   const upload = multer({
//     storage: storage,
//     limits: { fileSize: 5000000 }, // 1 MB limit
//   }).single('image'); // 'image' should match the field name in the form
// app.use('/uploads', express.static('uploads'));
// app.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//       if (err) {
//         return res.status(500).json({ error: err.message });
//       }
//       // File uploaded successfully, you can access req.file for details
//       return res.json({ filename: req.file.filename, path: req.file.path });
//     });
//   });






const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});