const Category = require('../model/category');
const config=require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');

const categoryServices = {

    getAllCategory: async (req, res) => {
        try {
            const getMenuList =await Category.find();
            res.status(200).json(
                {
                message:constants.succsessResponse.GET_SUCCESS_RES("Category"),
                result:getMenuList
            }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING('Category') });
        }
    },
    create:async(req,res)=>{
        try {
            const createdMenu = new Category(req.body);
            await createdMenu.save();
            
            res.status(201).json({
                message: 'Category created successfully',
                result: createdMenu
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error creating Category'
            });
        }

    },
    delete:async(req,res)=>{
        const { categoryId } = req.params;
        try {
            const deleteCategory= await Category.findByIdAndDelete(categoryId);

            if (!deleteCategory) {
                return res.status(404).json({
                    message: "Category does not exist",
                });
            }
            res.status(200).json({
                message: 'Category Removed successfully',
                result: deleteCategory,
            });
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({
                error: 'Error Deleting Category',
            });
        }
    }
}

module.exports=categoryServices