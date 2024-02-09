const logLevel = process.env.LOG_LEVEL || 'warn';
const colorsEnabled = process.env.COLORS_ENABLED || "0";
const logsFolder = process.env.LOGS_FOLDER || 'logs';

module.exports = {
    logLevel,
    colorsEnabled,
    logsFolder
}