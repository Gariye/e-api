const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, 'this name is already exist please choose another name'],
    required: [true, 'name must have a value'],
    min: 6,
  },
  email: {
    type: String,
    required: [true, 'user must have a user name'],
    unique: [true, 'this email is already in use'],
  },
  password: {
    type: String,
    required: [true, 'user must have a password'],
    min: 6,
    select: false,
  },
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
