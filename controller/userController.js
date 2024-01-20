const userservice = require('../service/userService')

const userController = {

    user: async (req, res) => {
        userservice.getAllUser(req, res)
    },
    signIn: async (req, res) => {
        userservice.signIn(req, res)
    },
    register: async (req, res) => {
        userservice.register(req, res)
    }
}
module.exports = userController;

