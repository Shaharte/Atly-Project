import Statitstics from '../models/StatitsticsModel.js';
import Post from '../models/PostModel.js';
import { StatusCodes } from 'http-status-codes';

// GET TOP CREATORS
export const getTopCreators = async (req, res) => {
  const topCreators = await Post.aggregate([
    { $group: { _id: '$creatorId', postCount: { $sum: 1 } } },
    { $sort: { postCount: -1, _id: 1 } },
    { $limit: 10 },
  ]);
  console.log(topCreators);
  res.status(StatusCodes.OK).json({ topCreators });
};

// GET AVARAGE RUNTIME
export const getAvaragRunTime = async (req, res) => {
  const aggregateResult = await Statitstics.aggregate([
    { $group: { _id: null, averageTime: { $avg: '$executionTime' } } },
  ]);
  const averageRuntime =
    aggregateResult.length > 0 ? aggregateResult[0].averageTime : 0;
  res.status(StatusCodes.OK).json({ averageRuntime });
};
