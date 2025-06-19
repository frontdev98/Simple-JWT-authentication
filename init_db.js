const pool = require('./db');

async function initDb() {
    try {
        await pool.query(`
            CREATE SCHEMA IF NOT EXISTS jwt_auth;

            CREATE TABLE IF NOT EXISTS jwt_auth.persons (
                id			SERIAL			PRIMARY KEY,
                email		VARCHAR(255) 	NOT NULL,
                password	VARCHAR(255)	NOT NULL,
                created_at	TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `);

    } catch (e) {
        console.log(`Error: ${e.message}, code=${e.code}`);
        process.exit(-1);
    }

    console.log("Database was successful initialized.");

    process.exit(0);
}

initDb();