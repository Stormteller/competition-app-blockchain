'use strict';

require('dotenv').config({ path: '.env' });

module.exports = {
    networks: {
        development: {
            host: process.env.ETHEREUM_HOST || '127.0.0.1',
            port: process.env.ETHEREUM_PORT || 8545,
            network_id: process.env.ETHEREUM_NETWORK_ID || '*',
            gas: 4600000
        }
    }
};
