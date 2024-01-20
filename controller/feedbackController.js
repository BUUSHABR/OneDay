const feedbackservice = require('../service/feedbackService')

const feedbackController = {

    list: async (req, res) => {
        feedbackservice.getAllFeedBack(req, res)
    },
    create: async (req, res) => {
        feedbackservice.create(req, res)
    },
    delete: async (req, res) => {
        feedbackservice.delete(req, res)
    },
    starred: async (req, res) => {
        feedbackservice.starred(req, res)
    }
}
module.exports = feedbackController;

