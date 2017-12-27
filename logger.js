'use strict';

const winston = require('winston');
const WinstonDailyRotateFile = require('winston-daily-rotate-file');

const fs = require('fs');

const logDir = '../logs';

winston.emitErrs = true;

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: tsFormat,
            colorize: true,
            level: 'debug',
            handleExceptions: true,
            prettyPrint: true,
        }),
        new (WinstonDailyRotateFile)({
            filename: `${logDir}/-logs.log`,
            timestamp: tsFormat,
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            json: false,
            level: 'info',
            prettyPrint: true,
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
    write: (message) => {
        logger.debug(message);
    },
};
