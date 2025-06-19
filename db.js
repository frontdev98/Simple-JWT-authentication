const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.on('error', (err, client) => {
    console.log(`Error was uccured during database request:\n${err}`);
});

module.exports = pool;