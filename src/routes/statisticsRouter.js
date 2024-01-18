import { Router } from 'express';

import {
  getTopCreators,
  getAvaragRunTime,
} from '../controllers/statisticsController.js';

const router = Router();

router.get('/topcreators', getTopCreators);
router.get('/runtimes', getAvaragRunTime);

export default router;
