const tasteservice = require('../service/tasteService')

const tasteController = {

    taste: async (req, res) => {
        tasteservice.getAllTaste(req, res)
    },
    create: async (req, res) => {
        tasteservice.create(req, res)
    },
    delete: async (req, res) => {
        tasteservice.delete(req, res)
    }
}
module.exports = tasteController;

