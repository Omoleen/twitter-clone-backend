const { body, validationResult, param,  } = require('express-validator');

const postValidator = [
    body('content').trim().notEmpty().withMessage('Content should not be empty')
]
const commentValidator = [
    body('content').trim().notEmpty().withMessage('Content should not be empty'),
    param('parentId').trim().notEmpty().withMessage('parentId field is needed')
]
const likeValidator = [
    // body('content').trim().notEmpty().withMessage('Content should not be empty'),
    param('parentId').trim().notEmpty().withMessage('parentId field is needed')
]

module.exports = {postValidator, commentValidator, likeValidator}