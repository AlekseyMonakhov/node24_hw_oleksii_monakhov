const http = require('http');
const logger = require('./utils/logger')('server.js');


const server = http.createServer((req, res) => {

    if (req.url === '/healthcheck' && req.method === 'GET') {
        res.statusCode = 200;

        const message = `${req.method} ${req.url} ${res.statusCode}`;

        logger.info(message);
        res.end('healthcheck passed');
    } else {

        res.statusCode = 404;

        const message = `${req.method} ${req.url} ${res.statusCode}`;

        logger.warn(message);
        res.end('404 Not Found');
    }
});


module.exports = server;

