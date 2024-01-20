const express = require('express');
const cuisineController = require('../controller/cuisineControlller');
const { userVerify } = require('../middleware/auth');




const router = express.Router();
router.get('/list',cuisineController.cuisine);
router.post('/create',userVerify,cuisineController.create);
router.put('/delete/:cuisineId',userVerify,cuisineController.delete);


module.exports = router;