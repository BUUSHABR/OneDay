const jwt = require('jsonwebtoken');
const User = require('../model/user');
const config = require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');
const bcrypt = require('bcrypt');

const userServices = {

    getAllUser: async (req, res) => {
        try {
            const getuserList = await User.find();
            res.status(200).json(
                {
                    message: constants.succsessResponse.GET_SUCCESS_RES("User"),
                    result: getuserList
                }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING("User's") });
        }
    },

    signIn: async (req, res) => {
        const { email, password } = req.body;
        console.log("yyyy",req.body)
        try {
            const user = await User.findOne({ email });
            console.log("userrr",user)
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            console.log("ispass",isPasswordValid)
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETKEY, { expiresIn: '5h' });
            console.log("tkt",token)
            res.status(200).json({
                message: 'Sign-in successful',
                data:{
                token,
                    name: user.name,
                    email: user.email,
                    role: user.role
                    }
            });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    register: async (req, res) => {
        const { name, email, password, role, domain, phone } = req.body;
        console.log("req.body.", req.body)
        try {
            // Check if the user with the given email already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ error: 'Email already exists' });
            }

            // Hash the password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                role,
                domain,
                phone,
            });

            // Save the user to the database
            await newUser.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = userServices;