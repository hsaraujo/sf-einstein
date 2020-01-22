const fetch = require('node-fetch');
const options = require('../utils/options');
const tokenUtils = require('./token-utils');
const FormData = require('form-data');

async function getStatus(modelId) {

    var token = await tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);

    const response = await fetch(options.options.baseUrl + '/v2/vision/train/' + modelId, {
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

async function trainDataset(name, datasetId) {

    var token = await tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);

    const form = new FormData();
    form.append('name', name);
    form.append('datasetId', datasetId);

    const response = await fetch(options.options.baseUrl + '/v2/vision/train/', {
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer ' + token
        },
        body: form
        
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

function retrainDataset(modelId){

    const form = new FormData();
    form.append('modelId', modelId);

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        return fetch(options.options.baseUrl + '/v2/vision/retrain', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            },
            body: form
        });
    })
    .then((response) => {

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

module.exports.getStatus = getStatus;
module.exports.trainDataset = trainDataset;
module.exports.retrainDataset = retrainDataset;

