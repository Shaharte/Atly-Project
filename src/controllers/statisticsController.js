import Statitstics from '../models/StatitsticsModel.js';
import Post from '../models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import express from 'express';

/**
 * getTopCreators return an array with the top 10 of post creators.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<{ topCreators: Array<{ _id: number, postCount: number }> }>} A Promise representing top creators.
 */

export const getTopCreators = async (req, res) => {
  const topCreators = await Post.aggregate([
    { $group: { _id: '$creatorId', postCount: { $sum: 1 } } },
    { $sort: { postCount: -1, _id: 1 } },
    { $limit: 10 },
  ]);
  res.status(StatusCodes.OK).json({ topCreators });
};

/**
 * getAvaragRunTime Calculate the average runtime of createPost and getPostsById functions.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 * @returns {Promise<{ averageRuntime: number }>} A Promise representing the average runtime.
 */

export const getAvaragRunTime = async (req, res) => {
  const aggregateResult = await Statitstics.aggregate([
    {
      $match: {
        isError: false, // Only include documents where isError is false
      },
    },
    {
      $group: {
        _id: null,
        averageTime: { $avg: '$executionTime' },
      },
    },
  ]);
  const averageRuntime =
    aggregateResult.length > 0 ? aggregateResult[0].averageTime : 0;
  res.status(StatusCodes.OK).json({ averageRuntime });
};
