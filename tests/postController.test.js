import {
  getAllPosts,
  createPost,
  getPostById,
  getTotalPosts,
} from '../src/controllers/postController.js';

describe('Post Controller', () => {
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

  test('getAllPosts should return a 200 status and a message', async () => {
    await getAllPosts(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual({ msg: 'getAllPosts' });
  });

  test('getTotalPosts should return a 200 status and a message', async () => {
    await getTotalPosts(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual({ msg: 'getTotalPosts' });
  });

  test('getPostById should return a 200 status and a message', async () => {
    await getPostById(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual({ msg: 'getPostById' });
  });

  test('createPost should return a 200 status and a message', async () => {
    await createPost(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(responseObject).toEqual({ msg: 'createPost' });
  });
});
