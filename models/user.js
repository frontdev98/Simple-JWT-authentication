const pool = require('../db');

class User {
    async getAll() {
        const users = await pool.query(`SELECT * FROM jwt_auth.persons;`).rows;
        return users;
    }

    async add(email, password) {
        const user = await pool.query(`INSERT INTO jwt_auth.persons VALUES ($1, $2) RETURNING *`, [email, password]);
        return user.rows[0];
    }

    async update(id, data) {
        const dataSetStr = Object.entries(data).map(([field, value]) => `${field} = ${value}`).join(', ');  // build string with data
        const user = await this.pool.query(`UPDATE jwt_auth.persons SET ${dataSetStr} WHERE id = ${id} RETURNING *;`);
        return user.rows[0];
    }

    async delete(id) {
        const user = await this.pool.query(`DELETE FROM jwt_auth.persons WHERE id = ${id}`);
        return user.rows[0];
    }
}

module.exports = new User(pool);