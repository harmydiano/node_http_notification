import mongoose from 'mongoose';

/**
 * @param {String} value The string to format
 * @return {String} The formatted string
 */
export const formatKey = (value) => {
	return value.charAt(0)+value.charAt(value.length-1);
};

/**
 * convert to uppercase 1st letter
 * @param {String} value
 * @return {Boolean} The code
 */
export const IsObjectId = (value) => {
	return value && value.length > 12 && String(mongoose.Types.ObjectId(value)) === String(value) && mongoose.Types.ObjectId.isValid(value);
};
