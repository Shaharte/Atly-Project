import { Router } from 'express';

import {
  getTotalPosts,
  createPost,
  getPostsById,
} from '../controllers/postController.js';

import {
  validatePostInput,
  validateCreatorIdInParams,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/', validatePostInput, createPost);
router.get('/postsnumber', getTotalPosts);
router.get('/:id', validateCreatorIdInParams, getPostsById);

export default router;
