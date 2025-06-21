const { logger } = require('../logger');

const errHandler = (err, req, res, next) => {
    logger.log({
        level: 'error',
        message: err
    });
    next();
};

module.exports = errHandler;