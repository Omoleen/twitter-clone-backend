const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const hashPassword = (password) => {
   return  bcrypt.hashSync(password, bcrypt.genSaltSync())
}

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

const generateToken = (id, email) => {
    return jwt.sign(
        {user_id: id, email},
        process.env.TOKEN_KEY,
        {
            expiresIn: process.env.TOKEN_EXPIRES,
        }
    )
}

const verifyToken = token => {
    return jwt.verify(token, process.env.TOKEN_KEY)
}

module.exports = { hashPassword, comparePassword, generateToken, verifyToken }