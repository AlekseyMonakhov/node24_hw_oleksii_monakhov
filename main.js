require('dotenv').config();
const config = require('config');
const port = config.get('port');

const server = require('./server');


server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});