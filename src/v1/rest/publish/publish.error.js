import AppError from '../../../lib/api/app-error';
import {BAD_REQUEST} from '../../../utils/constants';
import lang from '../../lang';

class PublisherError {
    static canPublish(emit) {
        if(!emit) {
            return new AppError(lang.get('publishs').can_not_publish, BAD_REQUEST);
        }
    }
}
export default PublisherError;