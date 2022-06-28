const express = require('express');
const products = require('../controllers/products');
const auth = require('../controllers/auth');
//initalize route
const productRoute = express.Router();

//all stasts
productRoute.route('/get-product-stats').get(products.getProductStats);

// all routes
productRoute
  .route('/')
  .get(auth.protect, products.getProducts)
  .post(products.createProduct);
productRoute
  .route('/:id')
  .get(products.getProduct)
  .patch(products.updateProduct)
  .delete(products.deleteProduct);

module.exports = productRoute;
