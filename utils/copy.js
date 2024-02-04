const fs = require('fs/promises');
const path = require('path')


const isFileAlreadyExists = async (dest) => {
    try {
        await fs.access(dest);

        return true;

    } catch (err) {
        return false;
    }
}


const copy = async (src, dest, logger) => {
    try {
        logger.info(`Copying ${src} to ${dest}`);

        const entries = await fs.readdir(src, { withFileTypes: true });

        await fs.mkdir(dest, { recursive: true });

        for (let entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copy(srcPath, destPath, logger);
            } else {
                const isAlreadyExists = await isFileAlreadyExists(destPath);

                if (isAlreadyExists) {
                    logger.warn(`File ${entry.name} already exists in ${destPath}. Skipping...`);
                    continue;
                }

                await fs.copyFile(srcPath, destPath);
                logger.info(`Copied ${entry.name} to ${destPath}`);

            }
        }

    } catch (err) {
        logger.error(err.message || "Error in copy function")
    }
};


module.exports = copy;