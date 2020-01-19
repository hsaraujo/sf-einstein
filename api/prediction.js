const fetch = require('node-fetch');
const options = require('../utils/options');
const tokenUtils = require('./token-utils');
const FormData = require('form-data');

async function predictByUrl(modelId, url) {

    const form = new FormData();
    form.append('modelId', modelId);
    form.append('sampleLocation', url);

    return await predict(form);
}

async function predictByImageFile(modelId, imageFile){

    const form = new FormData();
    form.append('modelId', modelId);
    form.append('sampleContent', imageFile);

    return await predict(form);
}

async function predictByImageB64(modelId, imageB64) {

    const form = new FormData();
    form.append('modelId', modelId);
    form.append('sampleBase64Content', imageB64);

    return await predict(form);
}

async function predict(form){

    var token = await tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);

    const response = await fetch(options.options.baseUrl + '/v2/vision/predict', {
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

module.exports.predictByUrl = predictByUrl;
module.exports.predictByImageB64 = predictByImageB64;
module.exports.predictByImageFile = predictByImageFile;