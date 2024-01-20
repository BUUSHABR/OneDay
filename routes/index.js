const express = require('express');
const menuRoutes =require('./menu');
const userRoutes =require('./user');
const feedbackRoutes=require('./feedback');
const categoryRoutes=require('./category');
const cuisineRoutes=require('./cuisine');
const tasteRoutes=require('./taste');

const router = express.Router();
router.use('/api/menu', menuRoutes);
router.use('/api/user', userRoutes);
router.use('/api/feedback', feedbackRoutes);
router.use('/api/taste', tasteRoutes);
router.use('/api/category', categoryRoutes);
router.use('/api/cuisine', cuisineRoutes);


module.exports = router;