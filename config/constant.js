const Constants = {
    succsessResponse: {
        GET_SUCCESS_RES:(data) => `Successfully Fetched ${data}`    
    },
    errorResponse: {
        ERROR_FETCHING:(data) => `Error in Fetching ${data}`
    },
    options: {
        PASSWORD_RESET: "Password Reset",
    },
    USER_NOT_FOUND: 'User not found.',

    Access: {
        TAB: {
            1: "quote",
            2: "purchase",
            3: "accounts",
            4: "delivery"
        },
        TYPE: {
            1: "read",
            2: "write",
            3: "delete"
        }

    },
    Swagger: {
        TITTLE: "OneDay Docs",
        DESCRIPTION: "OneDay Api Documentation",
        CONTACTNAME: "BharathRaj",
        SERVERS: ["http://localhost:5000/"],
        TYPE: "apiKey",
        BEARERAUTH_NAME: "Authorization",
        IN: "header",
        APIS: ["./src/swagger/*.js"]
    },
    IMAGE_PATH: "../upload/images",
    IMAGE_NAME: "logo.png",
  


};
module.exports = Constants;