const express = require('express');
const menuController = require('../controller/menuController');
const { userVerify } = require('../middleware/auth');




const router = express.Router();
router.get('/list',menuController.menu);
router.post('/create',userVerify,menuController.createMenu);
router.put('/edit/:menuId',userVerify,menuController.editMenu);
router.post('/remove',userVerify,menuController.deleteMenu);
router.get('/active',userVerify,menuController.getAllActiveMenus);


module.exports = router;