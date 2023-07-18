const {validationResult} = require("express-validator");
const {Post, File} = require("../models/content");
const {User} = require("../models/users");


const postContent = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    // console.log(req.user, req.body.content)
    const post = await Post.create({user: req.user.user_id, content: req.body.content})
    if (req.files.image) {
        const files = req.files.image.map(file => ({ name: file.filename, path: file.path }))
        const savedFiles = await File.create(files)
        post.images.addToSet(...savedFiles)
        await post.save()
    }
    console.log(post)
    return res.json(post.toJSON()).status(200)
}

const postComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    console.log(req.params.parentId)
    const parentPost = await Post.findById(req.params.parentId).populate('comments').populate('likes', ['email', 'firstName', 'lastName'])
    if (!parentPost) return res.status(400).send({msg: 'post does not exist'})
    const childPost = await Post.create({user: req.user.user_id, content: req.body.content, parentPost: parentPost._id})
    if (req.files.image) {
        const files = req.files.image.map(file => ({ name: file.filename, path: file.path }))
        const savedFiles = await File.create(files)
        post.images.addToSet(...savedFiles)
        await post.save()
    }

    parentPost.comments.push(childPost)
    await parentPost.save()
    return res.json(parentPost.toJSON())
}


const deletePostComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    const post = await Post.findById(req.params.postId)
    console.log(post, req.user.user_id, post.user.toString())
    if (!post) return res.status(400).send({msg: 'post does not exist'})
    if (post.user.toString() === req.user.user_id) {
        post.deleteOne()
        return res.sendStatus(204)
    } else {
        return res.status(400).send({msg: "you don't have permission"})
    }

}

const likeUnlikePost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    const post = await Post.findById(req.params.parentId).populate('comments').populate('likes', ['email', 'firstName', 'lastName'])
    if (!post) return res.status(400).send({msg: 'post does not exist'})
    if (post.likes.includes(req.user.user_id)) {
        post.likes.pull(await User.findById(req.user.user_id))
    } else {
        post.likes.push(await User.findById(req.user.user_id))
    }
    await post.save()
    return res.json(post.toJSON())
}
const getPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array()})
    const post = await Post.findById(req.params.postId).populate('comments').populate('likes', ['email', 'firstName', 'lastName']).populate('images')
    if (!post) return res.status(400).send({msg: 'post does not exist'})
    return res.json(post.toJSON())
}
const getFeed = async (req, res) => {
    var allFeed = []
    if (req.user) {
        console.log(req.user)
        const user = await User.findById(req.user.user_id)
        console.log(user)
        allFeed = await Post.find({
            parentPost: null,
            user: {
                $in: [...user.following, user._id]
            }
        }).populate('comments')
    } else {
        allFeed = await Post.find({
            parentPost: null
        }).populate('comments')
    }
    const allFeedJson = allFeed.map(post => post.toJSON());
    res.send(allFeedJson)
}

module.exports = {postContent,
    postComment,
    likeUnlikePost,
    getPost,
    deletePostComment,
    getFeed}