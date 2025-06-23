const jwt = require('jsonwebtoken');
const { logger } = require('../logger');

module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        const token = req.headers.authorization;

        if (!token) {
            return res.status(403).json("Not authorized");
        }

        try {
            const userRoles = jwt.verify(token.split(' ')[1], process.env.JWT_ACCESS_SECRET).roles;
            
            let hasRole = false;

            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.status(403).json({message: "No rights"});
            }

            next();

        } catch (e) {
            logger.log({
                level: 'error',
                message: e.message
            });
            return res.status(498).json("Not authorized.");
        }

        next();
    }
}