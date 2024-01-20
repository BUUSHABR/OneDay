const categoryservice = require('../service/categoryService')

const categoryController = {

    category: async (req, res) => {
        categoryservice.getAllCategory(req, res)
    },
    create: async (req, res) => {
        categoryservice.create(req, res)
    },
    delete: async (req, res) => {
        categoryservice.delete(req, res)
    }
}
module.exports = categoryController;

