const {Router} = require('express')
const {verifyUser} = require("../middlewares/auth");
const {postValidator, commentValidator, likeValidator} = require("../validators/content");
const {postContent, postComment, getPost, likeUnlikePost, deletePostComment, getFeed} = require("../controllers/content");
const upload = require("../middlewares/fileUpload");
const handleFileUploadError = require("../middlewares/handleFileUploadError");

const router = Router()
router.get('/posts/:postId/', getPost)
router.get('/posts', verifyUser, getFeed)

router.post('/', upload.fields([{
    name: 'image',
    maxCount: 4
}]), handleFileUploadError, postValidator, verifyUser, postContent)
router.post('/posts/:parentId/comment', upload.fields([{
    name: 'image',
    maxCount: 4
}]), handleFileUploadError, commentValidator, verifyUser, postComment)
router.post('/posts/:parentId/like', likeValidator, verifyUser, likeUnlikePost)
router.delete('/posts/:postId/', verifyUser, deletePostComment)

router.post('/upload', upload.fields([{
        name: 'file',
        maxCount: 3
      }]), (req, res) => {
  // Handle the uploaded file
    console.log(req.body.content, req.files)
  res.json({ message: 'File uploaded successfully!' });
});

module.exports = router