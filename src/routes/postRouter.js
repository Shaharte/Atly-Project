import { Router } from 'express';

import {
  getAllPosts,
  createPost,
  getPostById,
  getTotalPosts,
} from '../controllers/postController.js';

const router = Router();

router.get('/postsnumber', getTotalPosts);
router.route('/').get(getAllPosts).post(createPost);
router.get('/:id', getPostById);

export default router;
