const express = require('express');
const appSettings = require('./settings');
const db = require('./db');

const connHandler = require('./middlewares/connection');
const errHandler  = require('./middlewares/appError');

const authRouter = require('./routers/authRouter');

async function App() {
    try {
        const testDbRequest= await db.query(`SELECT 'Database is working!';`);

        console.log(`Database test: ${Object.entries(testDbRequest.rows[0])}`);

        const app = express();

        // show each connection to the server
        app.use(connHandler);

        // application error handler
        app.use(errHandler);

        // authentication router
        app.use('/auth', authRouter);

        // use json format for requests and responses
        app.use(express.json());

        app.listen(appSettings.PORT, () => {});

    } catch (err) {
        console.log(err);
    }
    
}

App();