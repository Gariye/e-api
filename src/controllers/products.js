const { productModel } = require('../models/products');
const { catchAsync, appError } = require('../apiFeatures/appError');

//create
exports.createProduct = catchAsync(async (req, res, next) => {
  const { productName, productDescription, productPrice, productImage } = req.body;

  const product = await productModel.create({
    productName,
    productDescription,
    productPrice,
    productImage,
  });
  res.status(200).json({
    status: 'success',
    resulst: product.length,
    product,
  });
});

//getall
exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await productModel.find(req.query);

  if (!products) {
    return next(new appError('no products found', 400));
  }

  res.status(200).json({
    status: 'success',
    resulst: products.length,
    products,
  });
});

//get one
exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const products = await productModel.findById(id);

  if (!products) {
    return next(new appError('no products found', 400));
  }

  res.status(200).json({
    status: 'success',
    resulst: products.length,
    products,
  });
});

//update
exports.updateProduct = async () => {};

//delete
exports.deleteProduct = async () => {};

//stats
exports.getProductStats = async () => {};
