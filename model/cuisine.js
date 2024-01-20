const mongoose = require('mongoose');


const cuisineSchema = new mongoose.Schema({


    cuisine_name: {
        type: String,
        required: true,
        unique:true
    },
    cuisine_icon: {
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

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

module.exports = Cuisine;