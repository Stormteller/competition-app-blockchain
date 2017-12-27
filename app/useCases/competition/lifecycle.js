'use strict';
const app = require('../../../app.js');

const CompetitionFactory = app.context.ethereumContracts.CompetitionFactory;
const competitionFactoryAddress = app.context.contractAddresses.CompetitionFactory;

const Competition = app.context.ethereumContracts.Competition;

const config = require('../../../config');

function startCompetition(topic, competitors, bet, finishDate) {
    return CompetitionFactory.at(competitionFactoryAddress)
        .then((competitionFactory) =>
            competitionFactory.createCompetition(topic, competitors, config.settings.maxCompetitors, bet, Number(finishDate))
                .then(transaction => competitionFactory.competitionsCreatedCount.call())
                .then(competitionsCount => competitionsFactory.competitionsCreated.call(competitionsCount - 1))
                .then(competitionAddress => {
                    const finishIn = finishDate - new Date();
                    setTimeout(finishCompetition, finishIn.bind(null, competitionAddress));
                    return competitionAddress;
                }));

}

function finishCompetition(competitionAddress) {
    return Competition.at(competitionAddress)
        .then((competition) => competition.finish());
}

function getLeaders(competitionAddress) {
    return Competition.at(competitionAddress)
        .then((competition) => competition.totalLeaders.call()
            .then(leaderAmount => {
                const leadersRequests = [];
                for (let i = 0; i < leaderAmount; i++) {
                    leadersRequests.push(competition.leaders.call(i));
                }
                return Promise.all(leadersRequests);
            }));
}

function getState(competitionAddress) {
    return Competition.at(competitionAddress)
        .then((competition) =>
            Promise.all([
                competition.topic.call(),
                competition.maxCompetitors.call(),
                competition.bet.call(),
                competition.finishDate.call(),
                competition.started.call(),
                competition.finished.call(),
                competition.totalCompetitors.call()
            ]))
        .then(([topic, maxCompetitors, bet, finishDate, started, finished, totalCompetitors]) => {
            const competition = {
                topic,
                maxCompetitors,
                bet,
                finishDate,
                started,
                finished
            };
            const competitorsRequests = [];
            for (let i = 0; i < totalCompetitors; i++) {
                competitorsRequests.push(competition.leaders.call(i));
            }
            return Promise.all(competitorsRequests)
                .then(competitors => {
                    competition.competitors = competitors;
                    return competition;
                });

        });
}

module.exports = {
    getLeaders,
    getState,
    startCompetition,
    finishCompetition
};