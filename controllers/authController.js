const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, roles) => {
    const payload = {id, roles};
    const secret  = process.env.JWT_SECRET;
    const token   = jwt.sign(payload, secret, {expiresIn: "6h"});
    return token;
};

class AuthController {
    async register(req, res) {
        // check request after validation
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const {email, password} = req.body;

        const isExist = await User.getOne({email: email});

        if (isExist) {
            return res.status(400).json("User already exists!");
        }
 
        // hash a password
        const passHash = bcrypt.hashSync(password, 7); 

        const user = new User(email, passHash, ['user']);
        
        // Save user
        await user.create(); 
        
        return res.json(`Dear ${user.email}! You're sucessfully registered.`);
    }

    async login(req, res) {
        // check request after validation
        const errors = validationResult(req); 

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        const {email, password} = req.body;

        const user = await User.getOne({email: email});

        if (user === undefined) {
            return res.status(400).json({message: "Invalid email or password."});
        }

        // compare entered password and its hash
        // if those aren't equal, that is error
        const validPass = bcrypt.compareSync(password, user.password); 

        if (!validPass) {
            return res.status(400).json({message: "Wrong email or password"});
        }

        // generate access token and send it to client
        const token = generateAccessToken(user.id, user.roles);

        return res.json({token});
    }

    async getUsers(req, res) {
        const users = await User.getAll();
        return res.json(users);
    }
}

module.exports = new AuthController();
