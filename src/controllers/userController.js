const userModel = require('../models/user');
const api = require('../apiFeatures/api');
const { catchAsync, appError } = require('../apiFeatures/appError');

//CREATE USERS
const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, comfirmPassword } = req.body;
  const newUser = await userModel.create({ name, email, password, comfirmPassword });

  res.json({
    status: 'success',
    newUser,
  });
});

// GET ALL USERS
const getAllUsers = catchAsync(async (req, res) => {
  const users = new api(userModel.find(), req.query)
    .filter()
    .sort()
    .field()
    .paginate();
  const user = await users.query;

  res.status(200).json({
    status: 'success',
    results: user.length,
    data: user,
  });
});

//READ ONE USER OR DOCUMENT
const GetUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.findById(id);

  if (!user) {
    return next(new appError('enable to read this document', 404));
  }

  res.json({
    status: 'success',
    data: {
      user,
    },
  });
});

//DELETE USER
const deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await userModel.findByIdAndDelete(id);

  if (!user) {
    return next(new appError('enable to read this document', 404));
  }

  res.json({
    status: 'success',
    message: 'woow, you success fully deleted this user',
  });
});

//UPDATE USER
const updateUser = catchAsync(async (req, res) => {
  const id = req.params.id;

  const user = await userModel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.json({
    status: 'success',
    data: {
      user,
    },
  });
});
module.exports = { getAllUsers, createUser, GetUser, deleteUser, updateUser };
