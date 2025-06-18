const useragent = require('useragent');

const connHandler = (req, res, next) => {
    const ip = req.ip;
    const clientInfo = useragent.parse(req.headers['user-agent']);
    const agent = clientInfo.toAgent();
    const device = clientInfo.device.toString();
    const os = clientInfo.os.toString();
    const date = new Date();

    // show connection details
    console.log(`[${date}]:\n\tFrom:   ${ip}\n\tAgent:  ${agent}\n\tDevice: ${device}\n\tOS:     ${os}`);
};

module.exports = connHandler;