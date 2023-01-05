const express = require("express")
const axios = require("axios")
const { API_KEY, MICROSERVICE_B_URL } = require("../../../config")
const addIdToRequest = require("../middlewares/addIdToRequest")
const logger = require("../logger")

const router = new express.Router()

const middlewares = [addIdToRequest]

// async functions do not block the main thread
router.get("/", middlewares, async (req, res) => {
    const cityId = req.query.cityId
    logger.info(`Request ${req.id} started.`)
    if (isNaN(cityId)) {
        logger.info(`Request ${req.id} finished with error.`)
        res.status(400).send({ error: "City id should be a number" })
        return
    }

    const data = {}

    const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}`

    if (req.query.forecast === "true") {
        // Call microservice B
        const url = `${MICROSERVICE_B_URL}/api/v1/forecast?cityId=${cityId}&reqId=${req.id}`
        try {
            const response = await axios.get(url)
            data.forecast = response.data
        } catch (e) {
            data.forecast = { error: e.message }
        }
    }

    try {
        const response = await axios.get(url)
        data.current = response.data
        logger.info(`Request ${req.id} finished.`)
        res.send(data)
    }
    catch (e) {
        const code = e.response.status
        const message = e.response.data.message
        logger.info(`Request ${req.id} finished with error.`)
        res.status(Number(code)).send({ error: message })
    }
})

module.exports = router