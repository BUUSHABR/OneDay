const mongoose = require('mongoose');

const rating_enum=[1,2,3,4,5];

const feedBackSchema = new mongoose.Schema({

 
    feedback: {
        type: String,
        required: true
    },
    dish_to_add: {
        type: String,
    },
    service_rating: {
        type: Number,
        default: '',
        enum:rating_enum,
    },
    food_rating: {
        type: Number,
        enum:rating_enum
    },
    overall_rating:{
        type:Number,
    },
    starred:{
        type:Boolean,
        default:false
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

const Feedback = mongoose.model('Feedback', feedBackSchema);

module.exports = Feedback;