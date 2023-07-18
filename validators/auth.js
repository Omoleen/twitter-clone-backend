const { body, validationResult } = require('express-validator');

const auth = [
    body('email').isEmail().withMessage('Input an email').exists().withMessage('email is compulsory'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
]


module.exports = auth