require('dotenv').config();


const logger = require('./utils/logger')('main');

logger.info('the script is running!');

logger.warn('this is a warning');

logger.error('this is an error');
