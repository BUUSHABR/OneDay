const response = require("../helpers/responseHandler");
const jwt = require('jsonwebtoken');
const UserModel = require("../model/user");
// const AdminModel = require("../model/AdminModel");
const constant = require('../helpers/responseHandler');
const User = require("../model/user");
module.exports = {
    userVerify: async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            if (!token) {
                return response.unAuthorized(res, "UnAuthorized Access");
            }
            token = token.split(" ")[1];
            let decode = jwt.decode(token, constant.jwtSecretKey);
            // if (decode.exp < Date.now() / 1000) {
            //     return response.unAuthorized(res, "Token expired");
            // }
          
            var user = await User.findById({ _id: decode.userId})
        
            if (!user) {
                return response.unAuthorized(res, "Invalid token");
            } else if (user.role!='Owner') {
                return response.unAuthorized(res, "Your Are not an Owner, Only Owner has the Access to this Route!");
            }
            req.user = user
            next();
        } catch (error) {
            console.log(error);
            return response.badImplementation(res);
        }
    },
    // adminVerify: async (req, res, next) => {
    //     try {
    //         console.log("inside adminVerify");
    //         let token = req.headers.authorization;
    //         if (!token) {
    //             return response.unAuthorized(res, "Token not found");
    //         }
    //         token = token.split(" ")[1];
    //         let decode = jwt.decode(token, constant.jwtSecretKey);
    //         if (decode.exp < Date.now() / 1000) {
    //             return response.unAuthorized(res, "Token expired");
    //         }
    //             var admin = await AdminModel.findOne({ _id: decode._id })
    //         if (!admin) {
    //             return response.unAuthorized(res, "Invalid token");
    //         // } else if (!admin.status) {
    //         //     return response.unAuthorized(res, "Account is suspended");
    //         }
    //         req.admin = admin
    //         next();
    //     } catch (error) {
    //         console.log(error);
    //         return response.badImplementation(res);
    //     }
    // }
}