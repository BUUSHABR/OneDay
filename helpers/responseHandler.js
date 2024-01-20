module.exports = {
    success: (res, msg, data = {}) => {
        return res.status(200).json({
            statusCode: 200,
            code: 1,
            message: msg,
            data
        })
    },

    badRequest: (res, msg) => {
        return res.status(400).json({
            statusCode: 400,
            code: 0,
            message: msg
        })
    },

    forbidden: (res, msg) => {
        return res.status(403).json({
            statusCode: 403,
            code: 0,
            message: msg
        })
    },

    badData: (res, msg) => {
        return res.status(422).json({
            statusCode: 422,
            code: 0,
            message: msg
        })
    },

    badImplementation: (res, msg) => {
        let responseData = {
            statusCode: 500,
            code: 0,
            message: 'Internal Server Error',
        }
        return res.status(500).json(responseData);
    },

    unAuthorized: (res, msg) => {
        return res.status(401).json({
            statusCode: 401,
            code: 0,
            message: msg,
        })
    },

    conflict:(res, msg) => {
        return res.status(301).json({
            statusCode: 301,
            code: 0,
            message: msg,
        })
    },
}