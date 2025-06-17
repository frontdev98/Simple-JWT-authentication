const express = require('express');
const appSettings = require('./settings');
const db = require('./db');

// appliation base error handler
const errHandler = (err, req, res, next) => {
    console.log(`An error was occured during application working: ${err}`);
    next();
};

async function App() {
    const testDbRequest= await db.query(`SELECT 'Database is working!';`);

    console.log(`Database test: ${Object.entries(testDbRequest.rows[0])}`);

    const app = express();

    // base error handler
    app.use(errHandler);

    // use json format for requests and responses
    app.use(express.json());

    app.listen(appSettings.PORT, () => {
        console.log(`Server's working on PORT ${appSettings.PORT}.`);
    });
}

App();