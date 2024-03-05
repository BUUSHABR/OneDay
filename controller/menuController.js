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
deleteMenu: async (req, res) => {
  menuservice.deleteMenu(req,res)
},
getAllActiveMenus:async(req,res)=>{
  menuservice.getAllActiveMenu(req,res)
}
}
module.exports=menuController;

