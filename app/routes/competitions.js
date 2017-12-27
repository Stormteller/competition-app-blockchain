'use strict';


const authorize = require('../../middlewares/authorization').authorize;
const CompetitionLifecycleUseCases = require('../useCases/competition/lifecycle');
const logger = require('../../logger');

module.exports = (app) => {
    app.route('/competition')
        .post(authorize, (req, res) => {
            if (!req.body.topic || !req.body.competitors || !req.body.bet || !req.body.finishDate) {
                return res.sendStatus(400);
            }

            return CompetitionLifecycleUseCases.startCompetition(req.body.topic, req.body.competitors,
                                                                 req.body.bet, new Date(req.body.finishDate))
                .then((data) => res.status(200).send({ address: data }))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });


    app.route('/competition/leaders')
        .get(authorize, (req, res) => {
            if (!req.body.competitionAddress) {
                return res.sendStatus(400);
            }

            return CompetitionLifecycleUseCases.getLeaders(req.body.competitionAddress)
                .then((data) => res.status(200).send({ leaders : data }))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });

    app.route('/competition')
        .get(authorize, (req, res) => {
            if (!req.query.competitionAddress) {
                return res.sendStatus(400);
            }

            return CompetitionLifecycleUseCases.getState(req.query.competitionAddress)
                .then((data) => res.status(200).send({ competition: data }))
                .catch((err) => {
                    logger.error(err);
                    res.status(400).send({ error: err.message });
                });
        });
};