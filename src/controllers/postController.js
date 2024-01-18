import Post from '../models/PostModel.js';

//GET ALL POSTS
export const getAllPosts = async (req, res) => {
  res.status(200).json({ msg: 'getAllPosts' });
};

// CREATE POST
export const createPost = async (req, res) => {
  const { title, body, creatorId } = req.body;
  const post = await Post.create({ title, body, creatorId });
  res.status(201).json({ post });
};

// GET POST BY ID
export const getPostById = async (req, res) => {
  res.status(200).json({ msg: 'getPostById' });
};

// GET TOTAL POSTS
export const getTotalPosts = async (req, res) => {
  res.status(200).json({ msg: 'getTotalPosts' });
};
