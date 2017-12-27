module.exports = (app) => {
    const CompetitionFactory = app.context.ethereumContracts.CompetitionFactory;

    const competitionFactoryAddress = app.context.contractAddresses.CompetitionFactory;

    CompetitionFactory.at(competitionFactoryAddress)
        .then(competitionFactory => {
            competitionFactory.CompetitionCreated().watch((err, response) => {})
        })
};