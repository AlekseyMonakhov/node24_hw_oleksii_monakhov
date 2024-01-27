const colors = require('colors/safe');
const { colorsEnabled } = require('config');

function colorize(text, color) {
    if (colorsEnabled === 0) return text;
    return colors[color](text);
}

module.exports = colorize;