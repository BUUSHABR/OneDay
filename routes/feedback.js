const express = require('express');
const feedbackController = require('../controller/feedbackController');
const { userVerify } = require('../middleware/auth');
const router = express.Router();
router.get('/list',userVerify,feedbackController.list);
router.post('/create',feedbackController.create);
router.delete('/delete/:deleteId',userVerify,feedbackController.delete);
router.put('/starred/:feedbackId',userVerify,feedbackController.starred);
module.exports = router;