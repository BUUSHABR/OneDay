const jwt = require('jsonwebtoken');
const Feedback = require('../model/feedback');
const Customer = require('../model/customer');
const config = require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');
const bcrypt = require('bcrypt');

const feedbackServices = {

    getAllFeedBack: async (req, res) => {
        try {
            const getFeedBackList = await Feedback.find();
            res.status(200).json(
                {
                    message: constants.succsessResponse.GET_SUCCESS_RES("FeedBack"),
                    result: getFeedBackList
                }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING("Feedback's") });
        }
    },

    create: async (req, res) => {
        try {
            let data=req.body;
             data.overall_rating=(data.food_rating+data.service_rating)/2
            const createdFeedBack = new Feedback(data);
            await createdFeedBack.save();
            res.status(201).json({
                message: 'FeedBack Posted successfully',
                result: createdFeedBack
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error creating menu'
            });
        }
    },

    delete: async (req, res) => {
        const { deleteId } = req.params;
        try {
            const deleteFeedback = await Feedback.findByIdAndDelete(deleteId);
    
            if (!deleteFeedback) {
                return res.status(404).json({
                    message: "Feedback does not exist",
                });
            }
            res.status(200).json({
                message: 'Feedback Removed successfully',
                result: deleteFeedback,
            });
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({
                error: 'Error Deleting Feedback',
            });
        }
    },
    starred: async (req, res) => {
        const { feedbackId } = req.params;
        try {
            const updatedFeedBack = await Feedback.findByIdAndUpdate(feedbackId, req.body, { new: true });

            if (!updatedFeedBack) {
                return res.status(404).json({
                    message: 'FeedBack not found',
                });
            }
        
            res.status(200).json({
                message: 'FeedBack edited successfully',
                result: updatedFeedBack,
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error editing FeedBack'
            });
        }
    }
}

module.exports = feedbackServices;