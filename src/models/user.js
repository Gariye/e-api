const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
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
    },
    comfirmPassword: {
      type: String,
      required: [true, 'user must have a comfirmation password'],
      min: 6,

      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'password did not match',
      },
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  const user = this;

  this.password = await bcrypt.hash(this.password, 12);
  this.comfirmPassword = undefined;
});

userSchema.pre('find', async function () {
  let query = this;
  query = query.select('-__v');
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
