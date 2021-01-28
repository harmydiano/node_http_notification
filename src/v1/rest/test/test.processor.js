import AppResponse from '../../../lib/api/app-response';
import _ from 'lodash';
/**
 * class TestEndpointProcessor
 */
class TestEndpointProcessor {
    /**
     * @param {Object} req The request object
     * @return {Object} res The response object
     */
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
export default TestEndpointProcessor;