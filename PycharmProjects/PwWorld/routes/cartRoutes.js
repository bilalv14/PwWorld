const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Adding product to cart
router.post('/add', cartController.addToCart);

// Gets users cart
router.get('/', cartController.getCart);

// Updating quantity
router.post('/update-quantity', cartController.updateQuantity);

// Checking out
router.post('/checkout', cartController.checkoutCart);

// Not buying cart
router.post('/empty', cartController.emptyCart);


module.exports = router;
