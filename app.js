const express = require("express")
const cors = require("cors")
const { PORT, FRONT_URL } = require("./config")
const v1 = require("./src/v1/app")

const app = express()

app.use(express.json())

app.use(cors({
    origin: FRONT_URL
}))

const root = "/api"
app.use(`${root}/v1`, v1)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})