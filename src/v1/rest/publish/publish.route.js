import { Router } from 'express';
import response from '../../../middleware/response';
import PublisherController from './publish.controller';

const router = Router();

const publishCtrl = new PublisherController();

router.route('/publish/:topic')
    .post(publishCtrl.publish, response);
export default router;
