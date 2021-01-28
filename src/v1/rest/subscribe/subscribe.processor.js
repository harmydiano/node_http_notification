import ApiService from '../../../../src/lib/api/app-request';
/**
 * class SubscriberProcessor
 */
class SubscriberProcessor {
    /**
     * @param {Object} req The request object
     * @return {Object} res The response object
     */
    static processNewObject(req) {
        return Object.assign({}, req.body, req.params);
    }

    static async allSubscribers(model, topic) {
        const subscribersList = await model.find({ topic });
        return subscribersList;
    }

    static async loadUrl(url) {
        return ApiService.init(url);
    }
    static async sendToAllSubscribers(model, topic, payload) {
        const subscribersList = await this.allSubscribers(model, topic);
        subscribersList.forEach(async subcribers => {
            const url = subcribers.url
            let api = await this.loadUrl(url);
            api.post(url, payload);
        })
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
export default SubscriberProcessor;