const express = require('express');
require('./src/database');

const server = express();
server.use(express.json());

server.listen(3000, () => console.log('server is up and reunning'));
