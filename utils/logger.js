const fs = require('fs');
const path = require('path');
const colorize = require('./colorize');
const config = require('config');

const logLevel = config.get('logLevel');
const logsFolder = config.get('logsFolder');

if (!fs.existsSync(logsFolder)) {
    fs.mkdirSync(logsFolder, { recursive: true });
}

const infoLogStream = fs.createWriteStream(path.join(__dirname, '..', logsFolder, 'info.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(__dirname, '..', logsFolder, 'error.log'), { flags: 'a' });

function formatMessage(message) {
    return `${new Date().toISOString()} - ${message}\n`;
}

function logger(moduleName) {
    return {
        error: (...reason) => {
            errorLogStream.write(formatMessage(moduleName + " ERROR: " + reason.join(" ")));
            console.error(colorize(moduleName + " ERROR:", 'red'), ...reason);
        },
        info: (...reason) => {
            infoLogStream.write(formatMessage(moduleName + " LOG: " + reason.join(" ")));
            if (logLevel === 'info') {
                console.log(colorize(moduleName + " LOG:", 'gray'), ...reason);
            }
        },
        warn: (...reason) => {
            errorLogStream.write(formatMessage(moduleName + " WARNING: " + reason.join(" ")));
            if (logLevel === 'info' || logLevel === 'warn') {
                console.warn(colorize(moduleName + " WARNING:", 'yellow'), ...reason);
            }
        }
    };

}

process.on("beforeExit", () => {
    console.log("Closing log streams");
    infoLogStream.end();
    errorLogStream.end();
})

module.exports = logger;
