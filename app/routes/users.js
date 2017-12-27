'use strict';

const register = require('../useCases/accounts/register');
const login = require('../useCases/accounts/login');
const balanceUseCase = require('../useCases/accounts/balance');

const authorize = require('../../middlewares/authorization').authorize;

const logger = require('../../logger');

module.exports = (app) => {

    app.route('/signup')
        .post((req, res) => {
            if (!req.body.password)
                return res.sendStatus(400);

            return register(req.body.password)
                .then((data) => res.status(200).send(data))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });

    app.route('/signin')
        .post((req, res) => {
            if (!req.body.address || !req.body.password)
                return res.sendStatus(400);

            return login(req.body.address, req.body.password)
                .then(token => res.status(200).send({ token }))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });

    app.route('/user/balance')
        .get(authorize, (req, res) => {
            const address = req.user.address;
            return balanceUseCase.balanceOf(address)
                .then(balance => res.status(200).send({ balance }))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });
};
