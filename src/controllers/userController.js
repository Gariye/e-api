const userModel = require('../models/user');

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
    const user = await userModel.find({});
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

module.exports = { getAllUsers, createUser };
