const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { appError, catchAsync } = require('../apiFeatures/appError');

const tokenFN = (id) => {
  return jwt.sign({ id }, process.env.secret, { expiresIn: process.env.expire });
};
const singup = catchAsync(async (req, res, next) => {
  //body

  const { name, email, password, comfirmPassword } = req.body;
  const user = await userModel.create({ name, email, password, comfirmPassword });

  const token = tokenFN(user._id);
  res.json({
    status: 'success',
    token,
    user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError('please provide email and password', 404));
  }

  const user = await userModel.findOne({ email }).select('+password');
  const isCorrectPassword = await user.correctPassword(password, user.password);

  if (!user || !isCorrectPassword) {
    return next(new appError('invalid email or password', 404));
  }

  const token = tokenFN(user._id);

  res.status(200).json({
    status: 'success',
    user,
    token,
  });
});

module.exports = { singup, login };
