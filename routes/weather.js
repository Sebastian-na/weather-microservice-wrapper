const express = require("express")
const axios = require("axios")
const { API_KEY } = require("../config")
const addIdToRequest = require("../middlewares/addIdToRequest")
const logger = require("../middlewares/logger")

const router = new express.Router()

const middlewares = [addIdToRequest, logger]

// async functions do not block the main thread
router.get("/", middlewares, async (req, res) => {
    const city = req.query.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    try {
        const response = await axios.get(url)
        console.log(`Request ${req.id} finished.`)
        res.send(response.data)
    }
    catch (e) {
        const code = e.response.data.cod
        const message = e.response.data.message
        console.log(`Request ${req.id} finished with error.`)
        res.status(Number(code)).send({ error: message })
    }
})

module.exports = router