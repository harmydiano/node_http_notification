import {OK} from '../../../utils/constants';
import TestProcessor from './test.processor';
import _ from 'lodash';

class TestEndpointController {

    /**
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {Function} next The callback to the next program handler
     * @return {void}
     */
    async test(req, res, next) {
        const { body } = req;
        console.log('publish recieved', body);
        const response = await TestProcessor.getResponse({
            code: OK,
            value: body,
        });
        res.status(OK).json(response);
        return;
    }
}
export default TestEndpointController;