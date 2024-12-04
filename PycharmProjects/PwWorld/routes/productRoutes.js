const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Gets all products or filters by category
router.get('/', productsController.getAllProducts);

// Gets all categories
router.get('/categories', productsController.getAllCategories);

// Gets products by category
router.get('/category/:id', productsController.getProductsByCategory);

// Gets product details by ID
router.get('/:id', productsController.getProductDetails);

// Sorts all products globally
router.get('/sort/:criteria', productsController.sortProducts);

// Sorts products within a category
router.get('/category/:id/sort/:criteria', productsController.sortProductsByCategory);

module.exports = router;
