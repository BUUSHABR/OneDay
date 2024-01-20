const express = require('express');
const tasteController = require('../controller/tasteController');
const { userVerify } = require('../middleware/auth');




const router = express.Router();
router.get('/list',tasteController.taste);
router.post('/create',userVerify,tasteController.create);
router.put('/delete/:tasteId',userVerify,tasteController.delete);


module.exports = router;