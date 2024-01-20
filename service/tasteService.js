
const Taste = require('../model/taste');
const config=require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');

const tasteServices = {

    getAllTaste: async (req, res) => {
        try {
            const getMenuList =await Taste.find();
            res.status(200).json(
                {
                message:constants.succsessResponse.GET_SUCCESS_RES("Taste"),
                result:getMenuList
            }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING('Taste') });
        }
    },
    create:async(req,res)=>{
        try {
            const createdMenu = new Taste(req.body);
            await createdMenu.save();
            
            res.status(201).json({
                message: 'Taste created successfully',
                result: createdMenu
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error creating taste'
            });
        }

    },
    delete:async(req,res)=>{
        const { tasteId } = req.params;
        try {
            const deleteTaste= await Taste.findByIdAndDelete(tasteId);

            if (!deleteTaste) {
                return res.status(404).json({
                    message: "Taste does not exist",
                });
            }
            res.status(200).json({
                message: 'Taste Removed successfully',
                result: deleteTaste,
            });
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({
                error: 'Error Deleting Taste',
            });
        }
    }
}

module.exports=tasteServices