import { Router } from 'express';
import userControllers from '../Controllers/userController';
const userRour = Router();

userRour.route('/').get(userControllers.getAllUsers).post();
userRour.route('/:id').get(userControllers.getOneUser).patch().delete();

export default userRour;
