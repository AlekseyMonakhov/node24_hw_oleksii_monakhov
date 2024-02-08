require('dotenv').config();


const logger = require('./utils/logger')('main.js');


let counter = 1;

while (counter < 100) {
    logger.info('Counter is at', counter);
    logger.error('Counter is at', counter);
    logger.warn('Counter is at', counter);
    counter++;
}
