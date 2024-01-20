import Post from '../models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';
import express from 'express';

/**
 * createPost create a post and return the post that was created.
 *
 * @param {express.Request} req - The Express request object.
 * @param {Object} req.body - The request body containing post data.
 * @param {string} req.body.title - The title of the post.
 * @param {string} req.body.body - The body content of the post.
 * @param {number} req.body.creatorId - The ID of the post's creator.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<{ post: { _id: string, title: string, body: string, creatorId: number, createdAt: Date, updatedAt: Date } }>} A Promise representing the post.
 */

export const createPost = async (req, res) => {
  const { title, body, creatorId } = req.body;
  const post = await Post.create({ title, body, creatorId });
  res.status(StatusCodes.CREATED).json({ post });
};

/**
 * getPostsById return an array of the creatorId Posts.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @param {Object} req.params - The request params.
 * @param {Object} req.query - The query params.
 * @param {string} req.params.id - The id of the creator.
 * @param {string} req.query.start - The starting point of quering the posts.
 * @param {string} req.query.limit - The limit number of posts.
 * @returns {Promise<{ posts: Array<{ _id: string, title: string, body: string, creatorId: number, createdAt: Date, updatedAt: Date }> }>} A Promise representing creator posts.
 */

export const getPostsById = async (req, res) => {
  const { id } = req.params;
  let { start = 0, limit = null } = req.query;
  start = parseInt(start);
  limit = parseInt(limit);
  const query = Post.find({ creatorId: id });
  query.sort({ createdAt: -1 }); // Sort by creation date, newest first
  query.skip(start); // Skip the first 'start' posts
  query.limit(limit); // Apply limit if it's greater than 0
  const posts = await query.exec();
  if (!posts.length) {
    throw new NotFoundError(`No posts for creator with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ posts });
};

/**
 * getTotalPosts get the total posts.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<{ documentsCount: number }>} A Promise representing the total posts.
 */

export const getTotalPosts = async (req, res) => {
  const documentsCount = await Post.countDocuments();
  res.status(StatusCodes.OK).json({ documentsCount });
};
