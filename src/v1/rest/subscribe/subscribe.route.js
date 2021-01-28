import { Router } from 'express';
import Subscriber from './subscribe.model';
import response from '../../../middleware/response';
import SubscriberController from './subscribe.controller';

const router = Router();

const subscribeCtrl = new SubscriberController(Subscriber);

router.route('/subscribe/:topic')
    .post(subscribeCtrl.subscribe, response);

export default router;
