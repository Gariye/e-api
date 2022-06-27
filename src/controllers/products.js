const { productModel } = require('../models/products');
const { catchAsync, appError } = require('../apiFeatures/appError');

//create
exports.createProduct = catchAsync(async (req, res, next) => {
  const {
    productName,
    productDescription,
    productPrice,
    productImage,
    productCategory,
  } = req.body;

  const product = await productModel.create({
    productName,
    productDescription,
    productPrice,
    productImage,
    productCategory,
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
    resulst: await productModel.countDocuments(),
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
exports.updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
    runValidators: true,
  });

  if (!updatedProduct) {
    return next(new appError('enable to update', 401));
  }

  res.status(200).json({
    status: 'success',
    updatedProduct,
  });
});

//delete
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedProduct = await productModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    return next(new appError('enable to update', 401));
  }

  res.status(200).json({
    status: 'success',
    deletedProduct,
  });
});

//stats
exports.getProductStats = catchAsync(async (req, res, next) => {
  const productStats = await productModel.aggregate([
    { $match: { productPrice: { $lte: 3 } } },
    {
      $group: {
        _id: '$productCategory',
        avPrice: { $sum: '$productPrice' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    productStats,
  });
});
