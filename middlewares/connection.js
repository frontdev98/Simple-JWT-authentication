const useragent = require('useragent');
const { logger } = require('../logger');

const connHandler = (req, res, next) => {
    const ip = req.ip;
    const clientInfo = useragent.parse(req.headers['user-agent']);
    const agent = clientInfo.toAgent();
    const device = clientInfo.device.toString();
    const os = clientInfo.os.toString();
    const date = new Date();

    // show connection details
    logger.log({
        level: 'info',
        message: `${date} ${ip} ${agent} ${device} ${os}`
    });

};

module.exports = connHandler;