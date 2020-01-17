const fetch = require('node-fetch');

function getDatasets() {

    const response = await fetch('https://api.einstein.ai/v1/vision/datasets', {
        method: 'GET',
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

exports.get = getDatasets;