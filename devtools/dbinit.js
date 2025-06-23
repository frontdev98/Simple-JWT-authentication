const pool = require('../db');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ],
    defaultMeta: {
        service: "Init DB"
    },
    format: winston.format.json(),
    exitOnError: false
});

async function initDb() {
    try {
        await pool.query(`

            /* Use new schema for the project */
            CREATE SCHEMA IF NOT EXISTS sch_jwt_auth;

            /* Set default schema to jwt_auth */
            SET search_path TO 'sch_jwt_auth';

            CREATE TABLE IF NOT EXISTS t_persons (
                id			SERIAL			    PRIMARY KEY,
                email		VARCHAR(255) 	    NOT NULL UNIQUE,
                password	VARCHAR(255)	    NOT NULL,
                created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                roles       VARCHAR(255)[],
                refresh_token VARCHAR(255)
            );
        `);

    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message
        });
        return -1;
    }

    logger.log({
        level: 'info',
        message: "Database was successful initialized."
    });

    return 0;
}

async function removeSchema() {
    try {
        await pool.query(`DROP SCHEMA sch_jwt_auth CASCADE`);

    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message,
        });
        return -1;
    }

    logger.log({
        level: 'info',
        message: "Schema was successfully removed."
    });

    return 0;
}

async function main() {
    if (process.argv.length < 3) {
        logger.log({
            level: 'error',
            message: `Missing argument`
        });
        process.exit(-1);
    }

    const arg = process.argv[2];
    let ret;

    switch (arg) {
        case 'init':
            ret = await initDb();
            break;
        case 'clear':
            ret = await removeSchema();
            break;
        default:
            logger.log({
                level: 'error',
                message: `Unrecongnized argument ${arg}`
            });
            process.exit(-1);
    }

    process.exit(0);
}

main();