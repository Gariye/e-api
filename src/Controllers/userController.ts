import { Response, Request } from 'express';
const getAllUsers = async (req: Request, res: Response) => {
  res.send('hello, from the server side');
};
const getOneUser = async (req: Request, res: Response) => {
  res.send('get one user');
};
export default { getAllUsers, getOneUser };
