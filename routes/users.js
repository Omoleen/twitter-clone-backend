var express = require('express');
const {getUser, followUnfollowUser} = require("../controllers/users");
const {validateGetUser} = require("../validators/users");
const {verifyUser} = require("../middlewares/auth");
var router = express.Router();

/* GET users listing. */
router.get('/:userId', validateGetUser, getUser)
router.post('/:userId/follow', validateGetUser, verifyUser, followUnfollowUser)

module.exports = router;
