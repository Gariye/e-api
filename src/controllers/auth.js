const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { appError, catchAsync } = require('../apiFeatures/appError');

const tokenFN = (id) => {
  return jwt.sign({ id }, process.env.secret, { expiresIn: process.env.expire });
};

const singup = catchAsync(async (req, res, next) => {
  //body

  const { name, email, password, comfirmPassword, passwordChange, role } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    comfirmPassword,
    passwordChange,
    role,
  });

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
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('invalid email or password', 404));
  }

  const token = tokenFN(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

const protect = catchAsync(async (req, res, next) => {
  // 1) Check the token if it exist
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new appError('you are not login, please login to access', 401));
  }

  try {
    // 2) Verifiy the jwt
    const decoded = await promisify(jwt.verify)(token, process.env.secret);

    // 3) check if user still exist
    const freshUser = await userModel.findOne({ _id: decoded.id });
    if (!freshUser) {
      return next(new appError(`this user ${decoded.id} no more exist `, 401));
    }

    // 4) check if user change password after the JWT token
    if (freshUser.changePasswordAfter(decoded.iat)) {
      return next(new appError('recently changed password, please login agin', 401));
    }

    req.user = freshUser;
  } catch (err) {
    return next(new appError(`${err.message} please try login agin`, 401));
  }

  next();
});

const restrictTo = (...roles) => {
  // role is an array
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new appError('you do not have a permission to do this action', 403),
      );
    }
    next();
  };
};

const forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // 1) Find user by email and verifiy is that user exist or not
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(
      new appError('this user is not in our database please try one more', 401),
    );
  }

  // 2) Generate Random Token
  jwt.sign();
  // 3) Send it to the users email
});

const resetPassword = () => {};

module.exports = {
  singup,
  login,
  protect,
  restrictTo,
  resetPassword,
  forgetPassword,
};
