import mongoose from 'mongoose';
import Q from 'q';
import config from 'config';

export default () => {

    mongoose.Promise = Q.Promise;
    mongoose.connection.on('disconnected', function() {
        console.log('Mongoose connection to mongodb shell disconnected');
    });
    // Don't ever remove this line.
    let databaseUrl = config.get('databases.mongodb.url');
    
    return mongoose
        .connect(databaseUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
};