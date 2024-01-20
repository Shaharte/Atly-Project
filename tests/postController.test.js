import {
  createPost,
  getPostsById,
  getTotalPosts,
} from '../src/controllers/postController.js';
import Post from '../src/models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../src/errors/customErrors.js';

describe('Post Controller', () => {
  let mockRequest;
  let mockResponse;
  let responseObject;

  beforeEach(() => {
    mockRequest = {
      params: {}, // Initialize params as an object
      query: {}, // Initialize query params as an object
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
    Post.countDocuments = jest.fn();
    Post.create = jest.fn();
    Post.find = jest.fn().mockReturnThis();
    Post.sort = jest.fn().mockReturnThis();
    Post.skip = jest.fn().mockReturnThis();
    Post.limit = jest.fn().mockReturnThis();
    Post.exec = jest.fn();
  });

  describe('getTotalPosts', () => {
    test('getTotalPosts should return status code 200 status and a total number of posts', async () => {
      Post.countDocuments.mockResolvedValue(5);
      await getTotalPosts(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ documentsCount: 5 });
      expect(Post.countDocuments).toHaveBeenCalled();
    });

    test('getTotalPosts should return status code 200 and should handle when there are no posts', async () => {
      Post.countDocuments.mockResolvedValue(0);
      await getTotalPosts(mockRequest, mockResponse);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toEqual({ documentsCount: 0 });
      expect(Post.countDocuments).toHaveBeenCalled();
    });
  });

  describe('getPostsById', () => {
    test('should return status code 200 and retrieve posts successfully', async () => {
      mockRequest.params.id = 1;
      mockRequest.query = { start: '1', limit: '5' };
      let mockPosts = [
        {
          _id: '65aa96b0d3fee923e5a18454',
          title: 'title 1',
          body: 'body 1',
          creatorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '65aa96add3fee923e5a18452',
          title: 'title 2',
          body: 'body 2',
          creatorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          _id: '65aa96add3fee923e5a18452',
          title: 'title 3',
          body: 'body 3',
          creatorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      Post.exec.mockResolvedValue(mockPosts.slice(1));

      await getPostsById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(responseObject).toHaveProperty('posts');
      expect(responseObject.posts).toEqual(mockPosts.slice(1));
      expect(Post.find).toHaveBeenCalledWith({ creatorId: 1 });
      // Check if the sort method is called correctly
      expect(Post.sort).toHaveBeenCalledWith({ createdAt: -1 });
      // Check if the skip method is called with the correct start value
      expect(Post.skip).toHaveBeenCalledWith(1);
      // Check if the limit method is called with the correct limit value
      expect(Post.limit).toHaveBeenCalledWith(5);

      // Add more assertions as necessary
    });

    test('should throw NotFoundError if no post were found', async () => {
      mockRequest.params.id = 1;
      mockRequest.query = { start: '0', limit: '5' };
      Post.exec.mockResolvedValue([]);

      await expect(getPostsById(mockRequest, mockResponse)).rejects.toThrow(
        NotFoundError
      );
      await expect(getPostsById(mockRequest, mockResponse)).rejects.toThrow(
        `No posts for creator with id 1`
      );
    });
  });

  describe('createPost', () => {
    test('createPost should successfully create a post', async () => {
      const mockedPost = {
        title: 'Test Title',
        body: 'Test Body',
        creatorId: 1,
      };
      mockRequest.body = mockedPost;
      Post.create.mockResolvedValue(mockedPost); // Mocking Post.create to resolve with mockedPost

      await createPost(mockRequest, mockResponse);
      expect(Post.create).toHaveBeenCalledWith(mockedPost);
      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED); // Check for CREATED status
      expect(responseObject).toEqual({ post: mockedPost });
    });
  });
});
