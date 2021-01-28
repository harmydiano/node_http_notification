/**
 * Subscriber Schema
 */
import mongoose, { Schema } from 'mongoose';
import AppSchema from '../_core/app.model';

const SubscribeModel = new AppSchema({
    topic: {
        type: String
    },
    url: {
        type: String
    }
}, {
    autoCreate: true,
    timestamps: true,
    toJSON: { virtuals: true }
});

/**
 * @typedef SubscribeModel
 */
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscribeModel);
export default Subscriber;