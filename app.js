const express = require("express")
const { port } = require("./config")
const weather = require("./routes/weather")

const app = express()
const root = "/api/v1"

app.use(express.json())
app.use(`${root}/weather`, weather)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})