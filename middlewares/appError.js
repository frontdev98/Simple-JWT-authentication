const errHandler = (err, req, res, next) => {
    console.log(`An error was occured during application working: ${err}`);
    next();
};

module.exports = errHandler;