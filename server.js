const http = require('http');
const logger = require('./utils/logger')('server.js');


const server = http.createServer((req, res) => {
    let statusCode = 200;

    if (req.url === '/healthcheck' && req.method === 'GET') {
        res.statusCode = statusCode;
        res.end('healthcheck passed');
    } else {
        statusCode = 404;
        res.statusCode = statusCode;
        res.end('404 Not Found');
    }
    const message = `${req.method} ${req.url} ${statusCode}`;
    logger.info(message);
});


module.exports = server;

