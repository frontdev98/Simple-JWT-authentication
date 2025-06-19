const pool = require('../db');

class User {
    async getAll() {
        return await pool.query(`SELECT * FROM jwt_auth.persons;`).rows;
    }

    async add(email, password) {
        const user = await pool.query(
            `INSERT INTO jwt_auth.persons VALUES ($1, $2) RETURNING *`, [email, password]
        );

        return user.rows[0];
    }

    async update(id, data) {
        const queryStr = `UPDATE jwt_auth.persons SET ` +
                        Object.entries(data).map(([field, value]) => `${field} = ${value}`).join(', ') +
                        `WHERE id = ${id} RETURNING *`;

        console.log(queryStr);

        const user = await this.pool.query(queryStr);

        return user.rows[0];
    }

    async delete(id) {
        const user = await this.pool.query(`DELETE FROM jwt_auth.persons WHERE id = ${id}`);

        return user.rows[0];
    }
}

module.exports = new User(pool);