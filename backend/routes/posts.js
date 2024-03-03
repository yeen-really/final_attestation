const express = require('express')
const {
  getAllPosts,
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost
} = require('../controllers/postController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getPosts)

router.get('/all', getAllPosts)


router.get('/:id', getPost)

router.post('/', createPost)

router.delete('/:id', deletePost)

router.patch('/:id', updatePost)


module.exports = router