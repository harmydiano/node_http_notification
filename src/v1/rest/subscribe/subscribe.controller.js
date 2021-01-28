import SubscriberProcessor from './subscribe.processor';
import Event from '../../../../src/lib/api/app-event';
import {OK} from '../../../utils/constants';
import _ from 'lodash';

class SubscriberController {

    constructor(model) {
            this.model = model;
            this.subscribe = this.subscribe.bind(this);
        }
        /**
         * @param {Object} req The request object
         * @param {Object} res The response object
         * @param {Function} next The callback to the next program handler
         * @return {void}
         */
    async subscribe(req, res, next) {
        const { topic, url } = SubscriberProcessor.processNewObject(req);
        const found = await this.model.findOne({topic});
        const sub = await this.model.findOneAndUpdate({ topic, url }, { $set: { topic, url } }, { upsert: true, new:true });
        if (!found) {
            Event.on(topic, async payload => {
                console.log('payload recieved', payload);
                await SubscriberProcessor.sendToAllSubscribers(this.model, topic, payload);
            });
        }
        req.response = {
            model: this.model,
            code: OK,
            value: _.pick(sub, ['url', 'topic']),
        };
        return next();
    }
}
export default SubscriberController;