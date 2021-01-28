import PublisherProcessor from './publish.processor';
import PublisherError from './publish.error';
import Event from '../../../../src/lib/api/app-event';
import {OK} from '../../../utils/constants';
import _ from 'lodash';

class PublisherController {

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next The callback to the next program handler
     * @return {void}
     */
    async publish(req, res, next) {
        try{
            const { topic, data } = PublisherProcessor.processNewObject(req);
            const emitted = await PublisherProcessor.publishToAllSubscribers(Event, topic, data);
            const emitError = PublisherError.canPublish(emitted);
            if (emitError instanceof AppError) {
                return next(emitError);
            }
            const response = await PublisherProcessor.getResponse({
                code: OK,
                value: data
            });
            res.status(OK).json(response);
            return;
        }
        catch(err) {
            return next(err);
        }
        
    }
}
export default PublisherController;