const Post = require('../models/postModel')
const mongoose = require('mongoose')

const getPosts = async (req, res) => {
  const user_id = req.user._id

  const posts = await Post.find({user_id}).sort({createdAt: -1})

  res.status(200).json(posts)
}

const getAllPosts = async (req, res) => {

  const posts = await Post.find().sort({createdAt: -1})

  res.status(200).json(posts)
}

const getPost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Такой статьи не существует'})
  }

  const post = await Post.findById(id)

  if (!post) {
    return res.status(404).json({error: 'Такой статьи не существует'})
  }
  
  res.status(200).json(post)
}

const createPost = async (req, res) => {
  const {title, article} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!article) {
    emptyFields.push('article')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Необходимо заполнить все поля', emptyFields })
  }

  try {
    const user_id = req.user._id
    const post = await Post.create({title, article, user_id})
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Такой статьи не существует'})
  }

  const post = await Post.findOneAndDelete({_id: id})

  if (!post) {
    return res.status(400).json({error: 'Такой статьи не существует'})
  }

  res.status(200).json(post)
}

const updatePost = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'Такой статьи не существует'})
  }

  const post = await Post.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!post) {
    return res.status(400).json({error: 'Такой статьи не существует'})
  }

  res.status(200).json(post)
}


module.exports = {
  getAllPosts,
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost
}