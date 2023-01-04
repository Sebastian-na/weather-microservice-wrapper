const express = require("express")
const axios = require("axios")
const { API_KEY } = require("../config")

const router = new express.Router()

// async functions do not block the main thread
router.get("/", async (req, res) => {
    const city = req.query.city
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    try {
        const response = await axios.get(url)
        res.send(response.data)
    }
    catch (e) {
        const code = e.response.data.cod
        const message = e.response.data.message
        res.status(Number(code)).send({ error: message })
    }
})

module.exports = router