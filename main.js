const express = require('express');
require('dotenv').config();

const connHandler = require('./middlewares/connection');
const errHandler  = require('./middlewares/appError');

const authRouter = require('./routers/authRouter');

async function App() {
    try {
        const app = express();

        // authentication router
        app.use('/auth', authRouter);

        // show each connection to the server
        app.use(connHandler);

        // application error handler
        app.use(errHandler);

        // use json format for requests and responses
        app.use(express.json());

        app.listen(process.env.PORT, () => {});

    } catch (err) {
        console.log(err);
    }
    
}

App();