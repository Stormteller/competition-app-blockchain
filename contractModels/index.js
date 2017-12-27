'use strict';

module.exports = {
    initModels: () => Promise.all([
        require('./CompetitionFactory'),
        require('./SmoothieToken'),
        require('./Competition'),]
    )
};
