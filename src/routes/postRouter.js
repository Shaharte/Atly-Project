import { Router } from 'express';

import {
  getTotalPosts,
  createPost,
  getPostsById,
} from '../controllers/postController.js';

import {
  validatePostInput,
  validateCreatorId,
} from '../middleware/validationMiddleware.js';

import executionTimeTracker from '../middleware/executionTimeTrackerMiddleware.js';

const router = Router();

router.post('/', validatePostInput, executionTimeTracker, createPost);
router.get('/postsnumber', getTotalPosts);
router.get('/:id', validateCreatorId, executionTimeTracker, getPostsById);

export default router;
