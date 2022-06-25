const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must have a value'],
      min: 6,
    },
    email: {
      type: String,
      unique: [true, 'this name is already exist please choose another name'],
      required: [true, 'user must have a user name'],
    },

    password: {
      type: String,
      required: [true, 'user must have a password'],
      min: 6,
      select: false,
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

  user.password = await bcrypt.hash(user.password, 12);
  user.comfirmPassword = undefined;
});

// creating built in methon in each doc
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.pre('find', async function () {
  let query = this;
  query = query.select('-__v');
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
