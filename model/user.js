const mongoose = require('mongoose');


const user_type_enum=["Owner","Customer","Staff","Chef"];
const domain_type_enum=["Kitchen","Store","Dining","Marketing","Delivering","Service","Juicer","Billing","Admin"]
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    role : {
        type: String,
       default:"Staff",
       enum:user_type_enum,
    },
    domain: {
        type:String ,
        default:'Billing',
        enum:domain_type_enum,
    },
    email: {
        type: String,
        default: '',
        required:true,
        unique:true
    },
    phone:{
        type:String,
        default:''
    },
    password:{
        type:String,
        required:true
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

const User = mongoose.model('User', userSchema);

module.exports = User;