const pg = require('pg');
const appSettings = require('./settings');

const pool = new pg.Pool(appSettings.databaseParameters);;

pool.on('error', (err, client) => {
    console.log(`Error was uccured during database request:\n${err}`);
});

module.exports = pool;