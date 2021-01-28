import axios from 'axios';
import config from 'config';
import interceptor from './axios-error-handler';

/** API Service classs */
class ApiService {
    /**
     * @param {string} baseUrl
     * @return {Object}
     */
    static init(baseUrl) {

            const defaultOptions = {
                baseURL: baseUrl,
                headers: this.setHeader(),
            };
            const instance = axios.create(defaultOptions);
            interceptor.responseInterceptor(instance);
            return instance;
        }
        /**
         * @function
         * @return {Object}
         */
    static setHeader() {
        const auth = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',
            'Content-Type': 'application/json'
        };
        return auth;
    }
}
export default ApiService;