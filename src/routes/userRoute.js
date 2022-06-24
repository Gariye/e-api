const userRoute = require('express').Router();
const userControllers = require('../controllers/userController');
const auth = require('../controllers/auth');

userRoute.route('/singup').post(auth.singup);
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
