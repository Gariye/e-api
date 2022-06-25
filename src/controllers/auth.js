const userModel = require('../models/user');

const singup = async (req, res, next) => {
  //body

  const { name, email, password, comfirmPassword } = req.body;
  const user = await userModel.create(req.body);

  res.json({
    status: 'success',
    user,
  });
};

module.exports = { singup };
