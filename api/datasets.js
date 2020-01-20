const fetch = require('node-fetch');
const options = require('../utils/options');
const tokenUtils = require('./token-utils');

function getAll() {

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        console.log('got token');
        return fetch(options.options.baseUrl + '/v2/vision/datasets', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        });
    })
    .then((response) => {

        console.log('resp');
        console.log(response.ok);

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

async function get(datasetId) {

    var token = await tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);

    const response = await fetch(options.options.baseUrl + '/v2/vision/datasets/' + datasetId, {
        method: 'GET',
        headers: {
            'Authorization' : 'Bearer ' + token
        }
        
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

exports.getAll = getAll;
exports.get = get;