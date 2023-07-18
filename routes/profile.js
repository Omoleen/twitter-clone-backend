const {Router} = require('express')
const profileController = require('../controllers/profile')
const authMiddleware = require('../middlewares/auth')
const upload = require("../middlewares/fileUpload");
const router = Router()

router.get('/', authMiddleware.verifyUser, profileController.profile)
router.patch('/', upload.single('profilePicture'), authMiddleware.verifyUser, profileController.editProfile)


module.exports = router