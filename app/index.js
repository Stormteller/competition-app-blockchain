const listeners = require('./useCases/listeners');
const routes = require('./routes');

module.exports = (app) => {
    listeners(app);
    routes(app);
};