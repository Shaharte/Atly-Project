import Post from '../models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// CREATE POST
export const createPost = async (req, res) => {
  const { title, body, creatorId } = req.body;
  const post = await Post.create({ title, body, creatorId });
  res.status(StatusCodes.CREATED).json({ post });
};

// GET POST BY ID
export const getPostsById = async (req, res) => {
  const { id } = req.params;
  const posts = await Post.find({ creatorId: id });
  if (!posts.length) {
    throw new NotFoundError(`No posts for creator with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ posts });
};

// GET TOTAL POSTS
export const getTotalPosts = async (req, res) => {
  const documentsCount = await Post.countDocuments();
  res.status(StatusCodes.OK).json({ documentsCount });
};
