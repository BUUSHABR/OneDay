
const Menu = require('../model/menu');
const config=require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');

const menuServices = {

    getAllMenu: async (req, res) => {
        try {
            const getMenuList =await Menu.find();
            res.status(200).json(
                {
                message:constants.succsessResponse.GET_SUCCESS_RES("Menu"),
                result:getMenuList
            }
            );
        }
        catch (error) {
            res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING('Menu') });
        }
    },
    createMenu:async(req,res)=>{
        try {
            const createdMenu = new Menu(req.body);
            await createdMenu.save();
            
            res.status(201).json({
                message: 'Menu created successfully',
                result: createdMenu
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error creating menu'
            });
        }

    },
    editMenu:async(req,res)=>{
        const { menuId } = req.params;
        try {
            const updatedMenu = await Menu.findByIdAndUpdate(menuId, req.body, { new: true });

            if (!updatedMenu) {
                return res.status(404).json({
                    message: 'Menu not found',
                });
            }
        
            res.status(200).json({
                message: 'Menu edited successfully',
                result: updatedMenu,
            });
        } catch (error) {
            res.status(400).json({
                error: 'Error editing menu'
            });
        }
    }
}

module.exports=menuServices