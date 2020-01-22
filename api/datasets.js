const fetch = require('node-fetch');
const options = require('../utils/options');
const tokenUtils = require('./token-utils');

function getAll() {

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        return fetch(options.options.baseUrl + '/v2/vision/datasets', {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        });
    })
    .then((response) => {

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

function createFromZipFile(name, type, data){
    const form = new FormData();
    form.append('name', name);
    form.append('type', type);
    form.append('data', data);

    return createDataset(form);

}

function createFromUrl(name, type, url){
    const form = new FormData();
    form.append('name', name);
    form.append('type', type);
    form.append('path', url);

    return createDataset(form);
}

function createDataset(form){

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        return fetch(options.options.baseUrl + '/v2/vision/datasets', {
            method: 'POST',
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

function deleteDataset(id){

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        return fetch(options.options.baseUrl + '/v2/vision/datasets/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        });
    })
    .then((response) => {

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

function getDeletionStatus(deletionId){

    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey)
    .then((token) => {

        return fetch(options.options.baseUrl + '/v2/vision/datasets/deletion/' + deletionId, {
            method: 'GET',
            headers: {
                'Authorization' : 'Bearer ' + token
            }
        });
    })
    .then((response) => {

        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}

exports.getAll = getAll;
exports.get = get;
exports.createFromUrl = createFromUrl;
exports.createFromZipFile = createFromZipFile;
exports.deleteDataset = deleteDataset;
exports.getDeletionStatus = getDeletionStatus;