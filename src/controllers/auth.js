const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { catchAsync, appError } = require('../apiFeatures/appError');

// const tokenFn = (id) => {
//   return jwt.sign({ id }, process.env.secret, { expiresIn: process.env.expire });
// };

exports.singup = catchAsync(async (req, res, next) => {
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    comfirmPassword: req.body.comfirmPassword,
  });

  if (!newUser) {
    next(new appError('no', 404));
  }

  //   const token = tokenFn(newUser._id);
  res.status(200).json({
    status: 'success',
    // token,
    newUser,
  });
});
