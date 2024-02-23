const fs = require('fs');
const path = require('path');


const storageFilePath = path.join(__dirname, '..', 'storage.json');

if (!fs.existsSync(storageFilePath)) {
    fs.writeFileSync(storageFilePath, '{}', 'utf8');
}


/**
 * @type {Object.<string, {name: string, email: string}>}
 */
const users = JSON.parse(fs.readFileSync(storageFilePath, 'utf8'));

/**
 * 
 * @param {typeof users} usersData
 * @returns {void}
 */

function saveUsers(usersData) {
    fs.writeFileSync(storageFilePath, JSON.stringify(usersData), 'utf8');
}


exports.users = users;
exports.saveUsers = saveUsers;

