const userRoute = require('express').Router();
const userControllers = require('../controllers/userController');
const auth = require('../controllers/auth');

userRoute.route('/singup').post(auth.singup);
userRoute.route('/login').post(auth.login);

userRoute.route('/forgetPassword').post(auth.forgetPassword);
userRoute.route('/resetPassword').post(auth.resetPassword);

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
