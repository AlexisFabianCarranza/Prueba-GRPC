var request = require('request');
const IP_HOST = process.env.IP_HOST || '0.0.0.0';
const logger = require('simple-node-logger').createSimpleLogger();


function hello(name) {
    let start =Date.now();
    logger.info('http://'+IP_HOST+':5001/hello?name=' + name)
    return request('http://'+IP_HOST+':5001/hello?name=' + name, function (error, response, body) {
        let end=Date.now();
        let diff= end-start;
        logger.info('body:', body + " - T " + diff); // Print the HTML for the Google homepage.
        return response;
    });
}

module.exports = {
    hello
};