'use strict';

const express = require('express');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config({ path: '.env' });

const app = express();

const setup = require('./initialize');

const authMiddlewares = require('./middlewares/authorization');

const morganFormat = ':remote-addr - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms';

app.use(require('morgan')(morganFormat, { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

setup(app).then(() => {
    app.use(authMiddlewares.privateApiAuthenticate);

    require('./app/index.js')(app);

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err, req, res) => {
        logger.error(err);
        res.status(err.status || 500)
            .send({ message: err.message || 'Unhandled error', type: errorTypes.general });
    });

    app.set('port', (process.env.PORT || 8080));

    app.listen(app.get('port'), () => {
        logger.info('Server is running on port ', app.get('port'));
    });
});

module.exports = app;