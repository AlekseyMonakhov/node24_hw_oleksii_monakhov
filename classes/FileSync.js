const copy = require('../utils/copy');


class FyleSync {
    constructor(srcFolder, destFolder, logger) {
        this.srcFolder = srcFolder;
        this.destFolder = destFolder;
        this.logger = logger;
    }

    async start() {
        await copy(this.srcFolder, this.destFolder, this.logger);
    }
}


module.exports = FyleSync;