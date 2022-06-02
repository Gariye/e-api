const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE = process.env.SERVER;
mongoose.connect(DATABASE);
