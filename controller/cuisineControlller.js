const cuisineservice = require('../service/cuisineService')

const cuisineController = {

    cuisine: async (req, res) => {
        cuisineservice.getAllCuisine(req, res)
    },
    create: async (req, res) => {
        cuisineservice.create(req, res)
    },
    delete: async (req, res) => {
        cuisineservice.delete(req, res)
    }
}
module.exports = cuisineController;

