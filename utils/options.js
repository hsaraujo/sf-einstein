exports.options = {
    baseUrl : 'https://api.einstein.ai'
};

exports.setup = (options) => {
    if(!options)
        return;
    this.options = options;
}