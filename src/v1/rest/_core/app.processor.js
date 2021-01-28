import AppResponse from '../../../lib/api/app-response';
import _ from 'lodash';

export const CREATE = 'create';
export const UPDATE = 'update';
export const DELETE = 'delete';

/**
 * The main processor class
 */
export default class AppProcessor {
	/**
     * @param {Model} model The default model object
     * for the controller. Will be required to create
     * an instance of the controller
     */
	constructor(model) {
		this.model = model;
	}

	/**
     * @param {Object} obj required for response
     * @return {Object}
     */
	async postDeleteResponse(obj) {
		return true;
	}

	/**
     * @param {Object} current required for response
     * @param {Object} obj required for response
     * @return {Object}
     */
	async validateUpdate(current, obj) {
		return null;
	}

	/**
     * @param {Object} obj required for response
     * @return {Object}
     */
	async validateDelete(obj) {
		return null;
	}

	/**
     * @param {Object} obj required for response
     * @return {Object}
     */
	async validateCreate(obj) {
		return null;
	}

	/**
     * @param {Object} obj required for response
     * @return {Object}
     */
	async postCreateResponse(obj) {
		return false;
	}

	/**
     * @param {Object} obj required for response
     * @param {Object} response required for response
     * @return {Object}
     */
	async postUpdateResponse(obj, response) {
		return false;
	}

	/**
     * @param {Object} options required for response
     * @return {Promise<Object>}
     */
	async getApiClientResponse({ model, chatUser, value, code, message, queryParser, pagination, count, token, email }) {
		const meta = AppResponse.getSuccessMeta();
		if (token) {
			meta.token = token;
		}
		_.extend(meta, { status_code: code });
		if (message) {
			meta.message = message;
		}
		if (queryParser && queryParser.population) {
			value = await model.populate(value, queryParser.population);
		}
		if (pagination && !queryParser.getAll) {
			pagination.totalCount = count;
			if (pagination.morePages(count)) {
				pagination.next = pagination.current + 1;
			}
			meta.pagination = pagination.done();
		}
		if (model.hiddenFields && model.hiddenFields.length > 0) {
			const isFunction = typeof value.toJSON === 'function';
			if (_.isArray(value)) {
				value = value.map(v => _.omit((isFunction) ? v.toJSON() : v, ...model.hiddenFields));
			} else {
				value = _.omit((isFunction) ? value.toJSON() : value, ...model.hiddenFields);
			}
		}
		if (email) {
			await sendEmail(email);
		}
		return AppResponse.format(meta, value);
	}


	/**
     * @param {Object} query The query object
     * @return {Promise<Object>}
     */
	async countQueryDocuments(query) {
		let count = await this.model.aggregate(query.concat([{ $count: 'total' }]));
		count = count[0] ? count[0].total : 0;
		return count;
	}
}
