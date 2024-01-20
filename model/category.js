const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({


    category_name: {
        type: String,
        required: true,
        unique:true
    },
    category_icon: {
        type: String,
    },
    createdAt: {
        type: Date,
       
    },
    updatedAt: {
        type: Date

    },
    createdByUserId: String,
    updatedByUserId: String,

});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;