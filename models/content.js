const mongoose = require('mongoose')
// const {User} = require("./users");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        // required: true
    }],
    parentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        default: null
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
    }]
},
    {
        // methods: {
        //     getLikes() {
        //         return mongoose.model('likes', LikesSchema).find({post: this}).countDocuments()
        //     },
        //     getComments() {
        //         return mongoose.model('comments', CommentSchema).find({parentPost: this}).populate('childPost')
        //         }
        //     },
        toJSON: {
            virtuals: true
            },
        timestamps: true
        },
    )
PostSchema.virtual('numLikes').get(function() {
  return this.likes.length;
});
PostSchema.virtual('numComments').get(function() {
  return this.comments.length;
});

PostSchema.post('remove', async doc => {
    const Post = mongoose.model('Post')
    await Post.updateMany(
        {
            comments: doc._id
        },
        {
            $pull: {
                comments: doc._id
            }
        }
    )
})
const Post = mongoose.model('Post', PostSchema)

// Creating a Schema for uploaded files
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Uploaded file must have a name"],
    },
    path: {
        type: String,
        required: [true, "Uploaded file must have a path"],
    },
},
    {
        timestamps: true
    }
);

// Creating a Model from that Schema
const File = mongoose.model("File", fileSchema);


module.exports = { Post, File }
