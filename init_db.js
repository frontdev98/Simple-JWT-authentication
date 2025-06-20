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

            /* 
                Create two users with its roles: 
                - delta657@gmail.com (admin),
                - kvazar123@icloud.com (user)
            */
            INSERT INTO persons (email, password, role) VALUES ('delta657@gmail.com', '12345678', 1);
            INSERT INTO persons (email, password, role) VALUES ('kvazar123@icloud.com', '12345678', 2);
        `);

    } catch (e) {
        console.log(`Error: ${e.message}, code=${e.code}`);
        return -1;
    }

    console.log("Database was successful initialized.");

    return 0;
}

async function removeSchema() {
    try {
        await pool.query(`DROP SCHEMA jwt_auth CASCADE`);

    } catch (e) {
        console.log(e);
        return -1;
    }

    return 0;
}

async function main() {
    if (process.argv.length < 3) {
        console.log("Missing argument");
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
            console.log(`Unrecongnized argument ${arg}`);
            process.exit(-1);
    }

    process.exit(0);
}

main();