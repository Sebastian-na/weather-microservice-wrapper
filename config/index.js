require("dotenv").config()

module.exports = {
    PORT: process.env.PORT,
    API_KEY: process.env.API_KEY,
    FRONT_URL: process.env.FRONT_URL,
    MICROSERVICE_B_URL: process.env.MICROSERVICE_B_URL,
    PRODUCTION: process.env.NODE_ENV === "production",
}