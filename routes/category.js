const express = require('express');
const categoryController = require('../controller/categoryController');
const { userVerify } = require('../middleware/auth');




const router = express.Router();
router.get('/list',categoryController.category);
router.post('/create',userVerify,categoryController.create);
router.put('/delete/:categoryId',userVerify,categoryController.delete);


module.exports = router;