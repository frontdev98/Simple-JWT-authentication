const pool = require('./db');

async function initDb() {
    try {
        await pool.query(`

            /* Use new schema for the project */
            CREATE SCHEMA IF NOT EXISTS jwt_auth;

            /* Set default schema to jwt_auth */
            SET search_path TO 'jwt_auth';

            CREATE TABLE IF NOT EXISTS roles (
                id          SERIAL              PRIMARY KEY,
                name        VARCHAR(255)        NOT NULL UNIQUE
            );

            CREATE TABLE IF NOT EXISTS persons (
                id			SERIAL			    PRIMARY KEY,
                email		VARCHAR(255) 	    NOT NULL UNIQUE,
                password	VARCHAR(255)	    NOT NULL,
                created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                role        INT                 NOT NULL,
                FOREIGN KEY (role) REFERENCES roles (id)
            );

            /* Create two roles: "admin" and "user" */
            INSERT INTO roles (name) VALUES ('admin');
            INSERT INTO roles (name) VALUES ('user');
        `);

    } catch (e) {
        console.log(`Error: ${e.message}, code=${e.code}`);
        process.exit(-1);
    }

    console.log("Database was successful initialized.");

    process.exit(0);
}

initDb();