const {Router} = require('express')
const authController = require('../controllers/auth')
const authValidator = require('../validators/auth')
const router = Router()

router.post('/register', authValidator, authController.register)

router.post('/login', authValidator, authController.login)


module.exports = router