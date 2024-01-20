const Cuisine = require('../model/cuisine');
const config=require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');

const cuisineServices = {

    getAllCuisine: async (req, res) => {
        try {
            const getMenuList =await Cuisine.find();
            res.status(200).json(
                {
                message:constants.succsessResponse.GET_SUCCESS_RES("Cuisine"),
                result:getMenuList
            }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING('Cuisine') });
        }
    },
    create:async(req,res)=>{
        try {
            const createdMenu = new Cuisine(req.body);
            await createdMenu.save();
            
            res.status(201).json({
                message: 'Cuisine created successfully',
                result: createdMenu
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error creating cuisine'
            });
        }

    },
    delete:async(req,res)=>{
        const { cuisineId } = req.params;
        try {
            const deleteCuisine= await Cuisine.findByIdAndDelete(cuisineId);

            if (!deleteCuisine) {
                return res.status(404).json({
                    message: "Cuisine does not exist",
                });
            }
            res.status(200).json({
                message: 'Cuisine Removed successfully',
                result: deleteCuisine,
            });
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({
                error: 'Error Deleting Cuisine',
            });
        }
    }
}

module.exports=cuisineServices