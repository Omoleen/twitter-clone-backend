const {User} = require("../models/users");
const { File } = require('../models/content')
const neededFields = ['email',
        'firstName', 'lastName', 'about', 'following', 'followers', 'profilePicture']

const profile = async (req, res) => {

    const user = await User.findById(req.user.user_id)
        .populate('followers', neededFields)
        .populate('following', neededFields)
        .populate('posts')
        .populate('profilePicture')
        .select(neededFields)
    res.send(user.toJSON())
}

const editProfile = async (req, res) => {
    const { about, firstName, lastName } = req.body
    let update = {}
    if (about) update = {...update, about}
    if (firstName) update = {...update, firstName}
    if (lastName) update = {...update, lastName}
    if (update) {
        const updatedUser = await User.findByIdAndUpdate(req.user.user_id, update, {new: true}).populate('followers', neededFields).populate('following', neededFields).populate('profilePicture')
        .select(neededFields)
        if (req.file) {
            File.create({ name: req.file.filename, path: req.file.path }).then(async file => {
                updatedUser.profilePicture = file
                await updatedUser.save()
            })
        }
        return res.status(200).send(updatedUser.toJSON())
    }
    return res.sendStatus(400)

}

module.exports = {profile, editProfile}