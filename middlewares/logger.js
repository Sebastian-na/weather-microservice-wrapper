const logger = (req, res, next) => {
    console.log(`Request received: ${req.id}`)
    next()
}

module.exports = logger