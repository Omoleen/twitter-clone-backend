const {body, param} = require('express-validator')

const validateGetUser = [
    param('userId').notEmpty().withMessage('Add a User Id')
]

module.exports = {validateGetUser}