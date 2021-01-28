import AppResponse from '../../../lib/api/app-response';
import _ from 'lodash';
class PublisherProcessor {
    static processNewObject(req) {
        return Object.assign({}, req.body, req.params);
    }

    static async publishToAllSubscribers(event, topic, payload) {
        console.log(topic, payload);
        return event.emit(topic, payload);
    }

    static async getResponse({ model, value, code, message }) {
        try {
            const meta = AppResponse.getSuccessMeta();
            _.extend(meta, { status_code: code });
            if (message) {
                meta.message = message;
            }
            return AppResponse.format(meta, value);
        } catch (e) {
            throw e;
        }
    }
}
export default PublisherProcessor;