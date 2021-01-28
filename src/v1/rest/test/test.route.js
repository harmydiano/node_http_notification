import { Router } from 'express';
import response from '../../../middleware/response';
import TestEndpointController from './test.controller';

const router = Router();

const testCtrl = new TestEndpointController();

router.route('/test([a-zA-Z0-9]+)')
    .post(testCtrl.test, response);

export default router;
