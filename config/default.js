require('dotenv').config();
const PORT = process.env.PORT || 3010;
module.exports = {
    app: {
        appName: process.env.APP_NAME || 'Pangaea',
        environment: process.env.NODE_ENV || 'dev',
        superSecret: process.env.SERVER_SECRET || 'ipa-BUhBOJAm',
        baseUrl: `http://localhost:${PORT}`,
        port: PORT,
        domain: process.env.APP_DOMAIN || 'app.com',
    },
    api: {
        lang: 'en',
        prefix: '^/api/v[1-9]',
        versions: [1],
        patch_version: '1.0.0',
        pagination: {
            itemsPerPage: 10
        }
    },
    services: {
        main: process.env.APP_SERVICE || 'http://localhost:3000/api/v1',
    },
    databases: {
        mongodb: {
            url: process.env.DB_URL
        }
    }
};