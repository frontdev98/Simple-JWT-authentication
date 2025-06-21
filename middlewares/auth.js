const jwt = require('jsonwebtoken');
const { logger } = require('../logger');

module.exports = function(req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json("Not authorized");
    }

    try {
        const decodedData = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decodedData;
        logger.log({
            level: 'info',
            message: `Successful authentication for ${decodedData.email}"`
        })
        next();

    } catch (e) {
        logger.log({
            level: 'error',
            message: e.message
        });
        return res.status(498).json("Token is expired.");
    }

    next();
}