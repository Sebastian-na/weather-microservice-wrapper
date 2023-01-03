const express = require("express")
const { API_KEY } = require("../config")

const router = new express.Router()

router.get("/:city", (req, res) => {
    const { city } = req.params
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}}&appid=${API_KEY}`
    fetch(url)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router