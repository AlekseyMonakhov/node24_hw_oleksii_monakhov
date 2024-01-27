const colors = require('colors/safe');
const config = require('config');

const colorsEnabled = config.get('colorsEnabled');

function colorize(text, color) {
    if (colorsEnabled === 0) return text;
    return colors[color](text);
}

module.exports = colorize;