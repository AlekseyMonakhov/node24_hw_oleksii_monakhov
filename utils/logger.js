const colorize = require('./colorize');
const config = require('config');

const logLevel = config.get('logLevel');

function logger(moduleName) {
    return {
        info: (...reason) => {
            if (logLevel === 'info') {
                console.log(colorize(moduleName + " LOG:", 'gray'), ...reason);
            }
        },
        warn: (...reason) => {
            if (logLevel === 'info' || logLevel === 'warn') {
                console.warn(colorize(moduleName + " WARNING:", 'yellow'), ...reason);
            }
        },
        error: (...reason) => {
            if (logLevel === 'info' || logLevel === 'warn' || logLevel === 'error') {
                console.error(colorize(moduleName + " ERROR:", 'red'), ...reason);
            }
        }
    };

}

module.exports = logger;
