const pool = require('../db');

class User {
    constructor(email, password, roles, id=undefined) {
        this._email = email;
        this._password = password;
        this._roles = roles;
        this._id = id;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get roles() {
        return this._roles;
    }

    get id() {
        return this._id;
    }

    static async getAll() {
        const query = await pool.query(`SELECT * FROM sch_jwt_auth.t_persons;`);
        const users = query.rows.map(({id, email, password, roles}) => 
            new User(email, password, roles, id));
        return users;
    }

    static async getOne(field) {
        const [name, value] = Object.entries(field)[0];
        const query = await pool.query(`SELECT * FROM sch_jwt_auth.t_persons WHERE ${name}=$1`, [value]);

        if (query.rows.length === 0)
            return undefined;

        const {id, email, password, roles} = query.rows[0];
        const user = new User(email, password, roles, id);
        return user;
    }

    async create() {
        const query = await pool.query(
            `INSERT INTO sch_jwt_auth.t_persons (
                email, 
                password, 
                roles
            ) VALUES (
                $1, 
                $2, 
                $3) 
            RETURNING *`,
        [this.email, this.password, this.roles]);

        const {email, password, roles, id} = query.rows[0];
        const user = new User(email, password, roles, id);
        return user;
    }

    async update(fields) {
        const {id, email, password, roles} = fields;
        const query = await pool.query(
            `UPDATE sch_jwt_auth.t_persons 
             SET 
                email=$1, 
                password=$2, 
                roles=$3 
            WHERE id=$4 
                RETURNING *`,
            [email, password, roles, id]);
        const row = query.rows[0];
        const user = new User(row.email, row.password, row.roles, row.id);
        return user;
    }

    [Symbol.toPrimitive] = function(hint) {
        return hint == 'string' ? `Person (${this.email} [${this.roles}]) ${this.id ? '*' : ''}` : this;
    }
}

module.exports = { User };