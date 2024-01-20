import {
  getTopCreators,
  getAvaragRunTime,
} from '../src/controllers/statisticsController.js';
import Post from '../src/models/PostModel.js';
import Statistics from '../src/models/StatitsticsModel.js';
import { StatusCodes } from 'http-status-codes';

describe('Statistics Controller', () => {
  let mockRequest;
  let mockResponse;
  let responseObject;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
  });

  //**** getTopCreators Tests ****

  describe('getTopCreators', () => {
    test('should return top creators with status code 200', async () => {
      // Define mock data for Post.aggregate
      const mockTopCreators = [
        { _id: 1, postCount: 10 },
        { _id: 2, postCount: 8 },
      ];

      // Mock the Post.aggregate function
      Post.aggregate = jest.fn().mockResolvedValue(mockTopCreators);

      await getTopCreators(mockRequest, mockResponse);

      expect(Post.aggregate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ topCreators: mockTopCreators });
    });
    test('should return empty topCreators array with status code 200 when there are no posts', async () => {
      // Define mock data for Post.aggregate when there are no posts
      const mockTopCreatorsWhenEmpty = [];

      // Mock the Post.aggregate function when there are no posts
      Post.aggregate = jest.fn().mockResolvedValue(mockTopCreatorsWhenEmpty);

      await getTopCreators(mockRequest, mockResponse);

      expect(Post.aggregate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ topCreators: [] });
    });
  });

  //**** getAvaragRunTime Tests ****

  describe('getAvaragRunTime', () => {
    test('should return average runtime with status code 200', async () => {
      // Define mock data for Statistics.aggregate
      const mockAggregateResult = [{ _id: null, averageTime: 5.8 }];

      // Mock the Statistics.aggregate function
      Statistics.aggregate = jest.fn().mockResolvedValue(mockAggregateResult);

      await getAvaragRunTime(mockRequest, mockResponse);

      expect(Statistics.aggregate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ averageRuntime: 5.8 });
    });

    test('getAvaragRunTime should return an average runtime of 0 with status code 200 when there are no statistics records', async () => {
      // Define mock data for Statistics.aggregate when there are no records
      const mockAggregateResult = [];

      // Mock the Statistics.aggregate function when there are no records
      Statistics.aggregate = jest.fn().mockResolvedValue(mockAggregateResult);

      await getAvaragRunTime(mockRequest, mockResponse);

      expect(Statistics.aggregate).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ averageRuntime: 0 }); // Average runtime should be 0 when there are no records
    });
  });
});
