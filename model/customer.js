const mongoose = require('mongoose');

const rating_enum=[1,2,3,4,5];

const customerSchema = new mongoose.Schema({

 
    email: {
        type: String,
       unique:true
    },
    phone: {
        type: String,
        unique:true
    },
    name: {
        type: String,
        default: '',
    },
    purchase_points: {
        type: Number,
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

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;