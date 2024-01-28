const colorize = require('./colorize');
const config = require('config');

const logLevel = config.get('logLevel');

function logger(moduleName) {
    return {
        error: (...reason) => {
            console.error(colorize(moduleName + " ERROR:", 'red'), ...reason);
        },
        info: (...reason) => {
            if (logLevel === 'info') {
                console.log(colorize(moduleName + " LOG:", 'gray'), ...reason);
            }
        },
        warn: (...reason) => {
            if (logLevel === 'info' || logLevel === 'warn') {
                console.warn(colorize(moduleName + " WARNING:", 'yellow'), ...reason);
            }
        }
    };

}

module.exports = logger;
