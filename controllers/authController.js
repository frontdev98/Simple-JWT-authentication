const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { logger } = require('../logger');

const generateTokenPair = (id, email, roles) => {
    const payload = {id, roles, email};
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'});

    logger.log({
        level: 'info',
        message: `Generate token pair for "${email}".`
    });

    return {accessToken, refreshToken};
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
        const {accessToken, refreshToken} = generateTokenPair(user.id, user.email, user.roles);

        return res.json({accessToken, refreshToken});
    }

    async isAuthorized(req, res) {
        return res.json("Access granted.");
    }

    async getUsers(req, res) {
        const users = await User.getAll();
        const response = users.map((user) => user.toJson());
        return res.json(response);
    }
}

module.exports = new AuthController();
