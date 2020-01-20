exports.options = {
    baseUrl : 'https://api.einstein.ai'
};

exports.setup = (options) => {
    if(!options){
        this.options = {
            baseUrl : 'https://api.einstein.ai',
            accountId : process.env.EINSTEIN_VISION_ACCOUNT_ID,
            privateKey : process.env.EINSTEIN_VISION_PRIVATE_KEY
        };
    } else {

        this.options = options;
    }
}