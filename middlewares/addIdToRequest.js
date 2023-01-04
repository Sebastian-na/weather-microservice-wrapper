const crypto = require("crypto")

const addIdToRequest = (req, res, next) => {
    req.id = crypto.randomUUID()
    next()
}

module.exports = addIdToRequest