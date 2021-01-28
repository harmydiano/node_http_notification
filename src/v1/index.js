import { Router } from 'express';

import publish from './rest/publish/publish.route';
import subscribe from './rest/subscribe/subscribe.route';
import test from './rest/test/test.route';

const router = Router();

router.use(publish);
router.use(subscribe);
router.use(test);

export default router;