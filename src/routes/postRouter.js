import { Router } from 'express';

import {
  getTotalPosts,
  createPost,
  getPostsById,
} from '../controllers/postController.js';

const router = Router();

router.get('/postsnumber', getTotalPosts);
router.post('/', createPost);
router.get('/:id', getPostsById);

export default router;
