const tokenUtils = require('./api/token-utils');
const options = require('./utils/options');

function getToken(){

    // var options = require('./utils/options');
    console.log(options);
    return tokenUtils.getAccessToken(options.options.accountId, options.options.privateKey);
}

module.exports.getToken = getToken;
module.exports.setup = (options) => {
    require('./utils/options').setup(options);
}
    