require('dotenv').config();
const config = require('config');
const port = config.get('port');

const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const router = require('./routes');


const logPath = path.join(__dirname, 'logs', 'app.log');
const logStream = fs.createWriteStream(logPath, { flags: 'a' });
const { saveUsers, users } = require('./utils/storage');


const app = express();
app.use(morgan(':method :url :status', { stream: logStream }));
app.use(morgan(':method :url :status'));

app.use(express.json());

app.use(router);


const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

server.on("beforeExit", () => {
    console.log('Закриття сервера...');
    saveUsers(users);
    process.exit();
});


process.on('SIGINT', () => {
    console.log('Закриття сервера...');
    saveUsers(users);
    process.exit();
});

process.on('SIGTERM', () => {
    console.log('Закриття сервера...');
    saveUsers(users);
    process.exit();
});





