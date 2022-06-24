const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { globalError, appError } = require('./src/apiFeatures/appError');

const server = express();
server.use(express.json());

// importing costom routes
const userRoute = require('./src/routes/userRoute');
server.use('/api/v1/users', userRoute);

//connecting database
const database = process.env.SERVER;
mongoose
  .connect(database)
  .then(() => {
    const port = process.env.PORT;
    server.listen(port, () =>
      console.log(`server is up and reunning on port ${port}`),
    );
  })
  .catch((err) => console.log(err));

server.all('*', (req, res, next) => {
  next(new appError(`this route : ${req.originalUrl} is not defined `, 404));
});

server.use(globalError);
