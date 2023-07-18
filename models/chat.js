const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    fromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
},
    {
        timestamps: true
    })
const Message = mongoose.model('Message', MessageSchema)

const GroupSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
},
    {
        timestamps: true
    })
const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, Message}