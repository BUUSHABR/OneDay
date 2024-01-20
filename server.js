require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');

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
app.use(routes)
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});