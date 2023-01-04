const express = require("express")
const cors = require("cors")
const { PORT, FRONT_URL } = require("./config")
const weather = require("./routes/weather")

const app = express()

app.use(express.json())

app.use(cors({
    origin: FRONT_URL
}))

const root = "/api/v1"
app.use(`${root}/weather`, weather)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})