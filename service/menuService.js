
const Menu = require('../model/menu');
const config=require("../config/config");
const mongoose = require('mongoose');
const constants = require('../config/constant');
const cron = require('node-cron');


cron.schedule('0 10 * * *', async () => {
  try {
      // Find inactive menus
      const inactiveMenus = await Menu.find({ active: false }); 
      // Activate inactive menus
      for (const menu of inactiveMenus) {
          menu.active = true;
          await menu.save();
          console.log(`Menu "${menu.item_name}" activated.`);
      }
  } catch (error) {
      console.error('Error activating menus:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Replace 'your-timezone' with your desired timezone
});
const menuServices = {

    getAllMenu: async (req, res) => {
        try {
            //const getMenuList =await Menu.find();
           const getMenuList=await Menu.aggregate([
            {
              $group: {
                _id: "$category",
                items: { $push: "$$ROOT" }
              }
            },
            {
              $addFields: {
                category: "$_id"
              }
            },
            {
              $sort: {
                category: 1 // Sort the categories alphabetically in ascending order
              }
            },
            {
              $project: {
                _id: 0 // Exclude the original _id field
              }
            }
          ])
          
              
              
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
    },

   deleteMenu:async (req, res) => {
      const { menuId } = req.query; 
  
      try {
          const deleteMenuById = await Menu.findByIdAndDelete(menuId); 
  
          if (!deleteMenuById) {
              return res.status(404).json({
                  error: 'Menu not found'
              });
          }
  
          res.status(200).json({
              message: 'Menu deleted successfully',
              result: deleteMenuById 
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({
              error: 'Error deleting menu'
          });
      }
  },
  
  getAllActiveMenu: async (req, res) => {
    try {
        const getMenuList = await Menu.aggregate([
            {
                $match: { active: true } // Filter documents where active is true
            },
            {
                $group: {
                    _id: "$category",
                    items: { $push: "$$ROOT" }
                }
            },
            {
                $addFields: {
                    category: "$_id"
                }
            },
            {
                $sort: {
                    category: 1 // Sort the categories alphabetically in ascending order
                }
            },
            {
                $project: {
                    _id: 0 // Exclude the original _id field
                }
            }
        ]);

        res.status(200).json({
            message: constants.succsessResponse.GET_SUCCESS_RES("Menu"),
            result: getMenuList
        });
    } catch (error) {
        res.status(400).json({ error: constants.errorResponse.ERROR_FETCHING('Menu') });
    }
},


  
}

module.exports=menuServices