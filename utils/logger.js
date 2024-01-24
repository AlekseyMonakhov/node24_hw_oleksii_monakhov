function logger(moduleName) {
    return {
        info: (message) => console.log(`${moduleName}: ${message}`),
        warn: (message) => console.warn(`${moduleName}: WARNING: ${message}`),
        error: (message) => console.error(`${moduleName}: ERROR: ${message}`)
    };
}

module.exports = logger;
