const {User} = require('../models/users')
const {hashPassword, comparePassword, generateToken} = require("../utils/auth");
const {validationResult} = require("express-validator");
const {use} = require("express/lib/router");


const register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    if (await User.findOne({email: req.body.email})) return res.status(400).send({msg: 'User already exists'})
    const user = await User.create({email: req.body.email, password: hashPassword(req.body.password)})
    user.accessToken = generateToken(user._id, user.email)
    await user.save()
    // return res.send({accessToken: user.accessToken})
    return res.json(user)
}

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send({msg: "user does not exist"})
    if (!comparePassword(req.body.password, user.password)) return res.status(400).send({msg: "wrong password!"})
    user.accessToken = generateToken(user._id, user.email)
    await user.save()
    // return res.send({accessToken: user.accessToken})
    return res.json(user)
}


module.exports = {register, login}