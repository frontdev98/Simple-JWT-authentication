const pool = require('../db');

class Role {
    async getAll() {
        const users = await pool.query(`SELECT * FROM jwt_auth.roles;`).rows;
        return users;
    }

    async getOne(id) {
        const user = await pool.query(`SELECT * FROM jwt_auth.roles WHERE id=$1;`, [name]).rows[0];
        return user;
    }

    async add(value) {
        const user = await pool.query(`INSERT INTO jwt_auth.roles VALUES ($1) RETURNING *`, [value]);
        return user.rows[0];
    }

    async update(id, value) {
        const user = await this.pool.query(`UPDATE jwt_auth.roles SET value = $1 WHERE id = $1 RETURNING *;`, [value, id]);
        return user.rows[0];
    }

    async delete(id) {
        const user = await this.pool.query(`DELETE FROM jwt_auth.roles WHERE id = $1 RETURNING *;`, [id]);
        return user.rows[0];
    }
}

module.exports = new Role(pool);