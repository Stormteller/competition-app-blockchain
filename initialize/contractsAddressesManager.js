'use strict';

const jsonfile = require('jsonfile');

function saveAddress(key, value, file) {
    const filename = file || 'contracts_addresses.json';

    return new Promise((resolve, reject) => {
        jsonfile.readFile(filename, (err, data) => {
            if(err) data = {};
            data[key] = value;
            jsonfile.writeFile(filename, data, {spaces: 4}, (err, res) => {
                if(err) return reject(err);
                resolve(data);
            })
        })

    })
}


function getAddress(key, file) {
    const filename = file || 'contract_addresses.json';

    return listAddresses(filename).then(data => data[key]);
}


function listAddresses(file) {
    const filename = file || 'contract_addresses.json';
    return new Promise((resolve, reject) => {
        jsonfile.readFile(filename, function (err, data) {
            if(err) return reject(err);
            resolve(data);
        })
    })
}


module.exports = {
    saveAddress,
    getAddress,
    listAddresses,
};