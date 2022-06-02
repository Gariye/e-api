const userRoute = require('express').Router();
const userControllers = require('../controllers/userController');

userRoute
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser);

userRoute
  .route('/:id')
  .get(userControllers.GetUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

module.exports = userRoute;
