const express = require('express');
const products = require('../controllers/products');
//initalize route
const productRoute = express.Router();

// all routes
productRoute.route('/').get(products.getProducts).post(products.createProduct);
productRoute
  .route('/:id')
  .get(products.getProduct)
  .patch(products.updateProduct)
  .delete(products.deleteProduct);

//all stasts
productRoute.route('/get-product-stats').get(products.getProductStats);

module.exports = productRoute;
