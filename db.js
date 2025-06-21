const pg = require('pg');
require('dotenv').config();
const { logger } = require('./logger');

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.on('error', (err, client) => {
    logger.log({
        level: 'error',
        message: err.message
    });
});

module.exports = pool;