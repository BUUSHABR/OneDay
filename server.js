require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
const multer = require('multer');
const { exec } = require('child_process');
const backupDir = './config';

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

    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
  
      // Backup command
      const backupFileName = `${backupDir}/backup-${new Date().toISOString()}.gz`;
      const backupCommand = `mongodump --uri ${config.dbUrl} --archive=${backupFileName} --gzip`;
  
      // Execute backup command
      exec(backupCommand, (error, stdout, stderr) => {
          if (error) {
              console.error(`Backup failed: ${error.message}`);
              return;
          }
          console.log(`Backup successful. Backup file: ${backupFileName}`);
      });
  });
  

app.use(routes);







const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 1 MB limit
  }).single('image'); // 'image' should match the field name in the form
app.use('/uploads', express.static('uploads'));
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // File uploaded successfully, you can access req.file for details
      return res.json({ filename: req.file.filename, path: req.file.path });
    });
  });






const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});