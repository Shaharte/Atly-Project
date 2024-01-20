import {
  createPost,
  getPostsById,
  getTotalPosts,
} from '../src/controllers/postController.js';
import Post from '../src/models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../src/errors/customErrors.js';

describe('Post Controller', () => {
  let mockRequest;
  let mockResponse;
  let responseObject;
  let mockFind;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
      }),
    };
    Post.countDocuments = jest.fn();
    Post.create = jest.fn();
    mockFind = {
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(/* mocked data */),
    };
    Post.find = jest.fn().mockReturnValue(mockFind);
  });

  //**** getTotalPosts Tests ****
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

  //**** getPostById Tests ****

  // test('getPostsById should return status code 200 and retrieve posts successfully', async () => {
  //   const mockPosts = [
  //     {
  //       title: 'title 1',
  //       body: 'body 1',
  //       creatorId: 1,
  //       _id: '1',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //     {
  //       title: 'title 2',
  //       body: 'body 2',
  //       creatorId: 1,
  //       _id: '2',
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //     },
  //   ];
  //   mockFind.exec.mockResolvedValue(mockPosts);
  //   // Mocking Post.find to resolve with mock data

  //   mockRequest.params = { id: '1' };
  //   mockRequest.query = { start: '0', limit: '10' };

  //   await getPostsById(mockRequest, mockResponse);

  //   expect(Post.find).toHaveBeenCalledWith({ creatorId: id });
  //   expect(mockFind.sort).toHaveBeenCalledWith({ createdAt: -1 });
  //   expect(mockFind.skip).toHaveBeenCalledWith(start);
  //   expect(mockFind.limit).toHaveBeenCalledWith(limit);
  //   expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
  //   expect(responseObject).toEqual({ posts: mockPosts });
  // });

  // test('getPostsById should throw NotFoundError if no posts are found', async () => {
  //   Post.find.mockResolvedValue([]); // Mocking Post.find with an empty array

  //   mockRequest.params = { id: 1 };
  //   mockRequest.query = {};
  //   mockFind.exec.mockResolvedValue([]);

  //   await expect(getPostsById(mockRequest, mockResponse)).rejects.toThrow(
  //     NotFoundError
  //   );
  //   // await expect(getPostsById(mockRequest, mockResponse)).rejects.toThrow(
  //   //   `No posts for creator with id 123`
  //   // );
  // });

  //**** createPost Tests ****
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
