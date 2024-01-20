const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({

    item_name: {
        type: String,
        required: true,
        unique:true
    },
    category: {
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    item_description: {
        type: String,
        default: ''
    },
    food_type:{
        type:Number,
        default:1
    },
    food_taste:{
        type:[],
    },
    food_fact:{
        type:String,
       
    },
    item_url: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,

    },
    updatedAt: {
        type: Date

    },
    createdByUserId: String,
    updatedByUserId: String,

});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;