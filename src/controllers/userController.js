const userModel = require('../models/user');
const api = require('../apiFeatures/api');

//CREATE USERS
const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();

    res.json({
      status: 'success',
      newUser,
    });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    // const queryObj = { ...req.query };
    // const exclueded = ['page', 'sort', 'limit', 'feild'];
    // exclueded.forEach((el) => delete queryObj[el]);

    // let queryStr = JSON.stringify(queryObj).replace(
    //   /(gte|gt|lt|lte)/g,
    //   (match) => `$${match}`,
    // );

    // let query = userModel.find(JSON.parse(queryStr));
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
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error: error.message,
    });
  }
};

//READ ONE USER OR DOCUMENT
const GetUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error('enable to read this document');
    }

    res.json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
};

//DELETE USER
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new Error('enable to delete this user');
    }

    res.json({
      status: 'success',
      message: 'woow, you success fully deleted this user',
    });
  } catch (error) {
    res.json({
      status: 'error',
      error: error.message,
    });
  }
};

//UPDATE USER
const updateUser = async (req, res) => {
  const id = req.params.id;

  //UPDATE VALIDATION
  const updates = Object.keys(req.body);
  const availbeUpdates = ['name', 'email', 'password'];
  const isValidUpdate = updates.every((el) => availbeUpdates.includes(el) === true);

  try {
    if (!isValidUpdate) {
      throw new Error('enable to update this feild');
    }

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
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message,
    });
  }
};
module.exports = { getAllUsers, createUser, GetUser, deleteUser, updateUser };
