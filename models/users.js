const mongoose = require('mongoose')
// const {model, mongo} = require("mongoose");
// const {generateToken} = require("../utils/auth");
// const {Post} = require("./content");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    accessToken: {
        type: String,
    },
    about: {
        type: String,
        default: ''
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }
    ],
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'
    }
}, {
    methods: {
        async followUnfollowUser(parentId) {
            const User = mongoose.model('User')
            await User.findById(parentId).then(async parentUser => {
                if (parentUser.following.includes(this._id)) {
                    await User.findByIdAndUpdate(parentId, {
                        $pull: {
                            followers: this._id
                        }
                    })
                    this.following.pull(parentUser)
                    await this.save()
                } else {
                    await User.findByIdAndUpdate(parentId, {
                        $push: {
                            followers: this._id
                        }
                    })
                    this.following.push(parentUser)
                    await this.save()
                }
            }).catch(err => {
                throw err
            })
        }
    },
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})
UserSchema.virtual('numFollowers').get(function(){
    return this.followers.length;
})
UserSchema.virtual('numFollowing').get(function(){
    return this.following.length;
})
UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'user',
  justOne: false,
  options: { virtual: true }
});


const User = mongoose.model('User', UserSchema)



module.exports = { User }
