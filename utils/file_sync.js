

const path = require('path');
const FileSync = require('../classes/FileSync');
const logger = require('./logger')('File Sync')

const srcFolder = path.join(__dirname, "..", "source");
const targetFolder = path.join(__dirname, "..", "target");

const fileSync = new FileSync(srcFolder, targetFolder, logger);

module.exports = fileSync;