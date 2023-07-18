const {User} = require("../models/users");


const getUser = async (req, res) => {
    const neededFields = ['email',
        'firstName', 'lastName', 'about', 'following', 'followers']
    const user = await User.findById(req.params.userId).populate('followers', neededFields).populate('following', neededFields)
        .select(neededFields)
    if (!user) return res.sendStatus(400)
    return res.status(200).send(user.toJSON())
}

const followUnfollowUser = async (req, res) => {
    const followingUser = await User.findById(req.user.user_id)
    try {
        await followingUser.followUnfollowUser(req.params.userId)
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
}

module.exports = {getUser, followUnfollowUser}