const menuservice= require('../service/menuService')

const menuController = {

  menu: async (req, res) => {
    menuservice.getAllMenu(req,res)
},
createMenu: async (req, res) => {
  menuservice.createMenu(req,res)
},
editMenu: async (req, res) => {
  menuservice.editMenu(req,res)
},

}
module.exports=menuController;

