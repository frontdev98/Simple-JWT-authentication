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
        const decodedData = jwt.verify(token.split(' ')[1], process.env.JWT_ACCESS_SECRET);
        req.user = decodedData;
        logger.log({
            level: 'info',
            message: `Successful authentication for ${decodedData.email}"`
        })
        next();

    } catch (e) {
        // response to the client type of the error
        let errorMessage = '';

        switch(e.name) {
            case 'TokenExpiredError':
                errorMessage = 'Token is expired';
                break;

            case 'JsonWebTokenError':
                errorMessage = `Token error: ${e.message}`;
                break;

            default:
                logger.log({
                    level: 'error',
                    message: e
                });
                errorMessage = 'Unrecongnized error';
                break;
        }
        
        return res.status(401).json(errorMessage);
    }

    next();
}