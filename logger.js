const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.json(),
    defaultMeta: {service: 'JWT-Auth'},
    transports: [
        // new winston.transports.File({
        //     filename: process.env.LOG_PATH
        // })
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ],
    exitOnError: false
});

// if (process.env.NODE_ENV === 'dev') {
//     logger.add(
//         new winston.transports.Console({
//             format: winston.format.simple()
//         })
//     );
// }

module.exports = {
    logger
};