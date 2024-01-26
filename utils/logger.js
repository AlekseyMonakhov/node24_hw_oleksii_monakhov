function logger(moduleName) {
    return {
        info: (...reason) => console.log(`${moduleName}: LOG ${reason}`),
        warn: (...reason) => console.warn(`${moduleName}: WARNING: ${reason}`),
        error: (...reason) => console.error(`${moduleName}: ERROR: ${reason}`)
    };
}

module.exports = logger;
