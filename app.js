const express = require('express');
require('./src/database');

const server = express();
server.use(express.json());

// importing costom routes
const userRoute = require('./src/routes/userRoute');
server.use('/api/v1/users', userRoute);

server.listen(3000, () => console.log('server is up and reunning'));
