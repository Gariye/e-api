const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'product must have a name'],
    minlength: 10,
  },
  productDescription: {
    type: String,
    required: [true, 'product must have a Description'],
    lowercase: true,
    minlength: 10,
  },
  productPrice: {
    type: Number,
    required: [true, 'product must have a price'],
  },
  productCategory: {
    type: String,
    required: [true, 'product must have a category'],
  },
  productImage: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// middle wares

productSchema.pre('find', function () {
  this.select('-__v');
});

exports.productModel = mongoose.model('prodducts', productSchema);
