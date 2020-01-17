const tokenUtils = require('./api/token-utils')

function getToken(accountId, privateKey){

    return tokenUtils.getAccessToken(accountId, privateKey);
}

module.exports.getToken = getToken;