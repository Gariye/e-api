const userRoute = require('express').Router();
const userControllers = require('../controllers/userController');

userRoute.route('/').get(userControllers.getAllUsers).post(userControllers.createUser);
userRoute.route('/:id').get().patch().delete();

module.exports = userRoute;
