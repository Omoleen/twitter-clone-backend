const {verifyToken} = require("../utils/auth");
require('dotenv').config()

const verifyUser = (req, res, next) => {
    if ((req.url === '/posts') && (req.method === 'GET')) {
        if (!req.headers.authorization) {
            return next()
        }
    }
    if (!req.headers.authorization) return res.sendStatus(401)
    try {
        req.user = verifyToken(req.headers.authorization.replaceAll('Bearer ', ''), process.env.TOKEN_KEY)
        // console.log(req.user)
        return next()
    } catch (e) {
        console.log(e)
        if ((req.url === '/posts') && (req.method === 'GET')) return next()
        return res.sendStatus(401)
    }
}

module.exports = {verifyUser}