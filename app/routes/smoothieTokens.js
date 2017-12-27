'use strict';

const authorize = require('../../middlewares/authorization').authorize;

const SmoothieTokenUseCases = require('../useCases/tokens/smoothieTokens');
const logger = require('../../logger');

module.exports = (app) => {
    app.route('/token/fee')
        .post(authorize, (req, res) => {
            if (!req.body.sum)
                return res.sendStatus(400);

            return SmoothieTokenUseCases.takeFeeFrom(req.user.address, req.body.sum)
                .then((data) => res.status(200).send(data))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });

    app.route('/token/reward')
        .post(authorize, (req, res) => {
            if (!req.body.sum)
                return res.sendStatus(400);

            return SmoothieTokenUseCases.giveRewardTo(req.user.address, req.body.sum)
                .then((data) => res.status(200).send(data))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });
};