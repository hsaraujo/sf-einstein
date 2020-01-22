const tokenUtils = require('./api/token-utils');
const options = require('./utils/options');
const datasets = require('./api/datasets');
const training = require('./api/training');
const prediction = require('./api/prediction');

function getToken(){

    // var options = require('./utils/options');
    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);
}

module.exports.getToken = getToken;
module.exports.setup = options.setup;
module.exports.getDatasets = datasets.getAll;
module.exports.getDataset = datasets.get;
module.exports.createDatasetFromZipFile = datasets.createFromZipFile;
module.exports.createDatasetFromUrl = datasets.createFromUrl;
module.exports.deleteDataset = datasets.deleteDataset;
module.exports.getDatasetDeletionStatus = datasets.getDatasetDeletionStatus;
module.exports.getTrainingStatus = training.getStatus;
module.exports.trainDataset = training.trainDataset;
module.exports.predictByUrl = prediction.predictByUrl;
module.exports.predictByImageB64 = prediction.predictByImageB64;
module.exports.predictByImageFile = prediction.predictByImageFile;