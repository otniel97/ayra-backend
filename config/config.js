require('../config/env.js')

module.exports = {
    development: {
        username: process.env.ARYA_DEV_USERNAME || 'postgres',
        password: process.env.ARYA_DEV_PASSWORD || 'root',
        database: process.env.ARYA_DEV_DATABASE || 'nao',
        host: process.env.host || '127.0.0.1',
        dialect: 'postgres',
        define: {
            paranoid: true
        },
        logging: console.log,
        timezone: '-04:00'
    },
    test: {
        username: process.env.NAO_TEST_USERNAME || 'postgres',
        password: process.env.NAO_TEST_PASSWORD || 'root',
        database: process.env.ARYA_TEST_DATABASE || 'nao',
        host: process.env.host || '127.0.0.1',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: "DATABASE_URL",
        username: process.env.ARYA_PROD_USERNAME,
        password: process.env.ARYA_PROD_PASSWORD,
        database: process.env.ARYA_PROD_DATABASE,
        host: process.env.ARYA_PROD_HOST,
        dialect: 'postgres'
    }
}