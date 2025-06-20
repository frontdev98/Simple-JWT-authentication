const bcrypt = require('bcrypt');
const user = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');

const generateAccessToken = (id, role=2) => {
    const payload = {id, role};
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class AuthController {
    async register(req, res) {
        try {
            // check request after validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const {email, password} = req.body;
            const candidate = await user.getOne(email);

            if (candidate !== undefined) {
                return res.status(400).json("User already exists!");
            }

            // hash a password
            const passHash = bcrypt.hashSync(password, 7);

            const createdUser = await user.add(email, passHash);

            return res.json(`Dear ${createdUser.email}! You're sucessfully registered.`);

        } catch (e) {
            console.log(e);
            return res.status(400).json("Registration error");
        }
    }

    async login(req, res) {
        try {
            // check request after validation
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const {email, password} = req.body;

            const candidate = await user.getOne(email);

            if (candidate === undefined) {
                return res.status(400).json({message: "Wrong email or password"});
            }

            // compare entered password and its hash
            const validPass = bcrypt.compareSync(password, candidate.password);
            if (!validPass) {
                return res.status(400).json({message: "Wrong email or password"});
            }

            // generate access token:
            // it's sent by HTTP protocol,
            // e.g. HTTP -> Headers -> Authorization = "Bearer sfdfgfgsdfgdsfg..."
            const token = generateAccessToken(candidate.id, candidate.role);

            return res.json({token});

        } catch (e) {
            console.log(e);
            return res.status(400).json("Login error");
        }
    }

    async getUsers(req, res) {
        try {
            const users = await user.getAll();
        
            if (users === undefined)
                return res.json('No users yet.');

            return res.json(users);
        
        } catch (e) {
            console.log(e);
            return res.status(400).json("Request error");
        }
    }

    
}

module.exports = new AuthController();
