const mongoose = require('mongoose');


const tasteSchema = new mongoose.Schema({


    taste_name: {
        type: String,
        required: true,
        unique:true
    },
    taste_icon: {
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

const Taste = mongoose.model('Taste', tasteSchema);

module.exports = Taste;