const cartModel = require('../models/cartModel');

exports.addToCart = (req, res) => {
    try {
        const { productId } = req.body;
        const userId = 1;

        // checks if  user has an active cart
        let cart = cartModel.getUserCart(userId);

        if (!cart) {
            // creates a new cart if none exists
            const result = cartModel.createCart(userId);
            cart = { id: result.lastInsertRowid };
        }

        // Adds product to the cart
        cartModel.addToCart(cart.id, productId);

        res.json({ message: 'Product added to cart successfully', cartId: cart.id });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
};


exports.getCart = (req, res) => {
    try {
        const userId = 1;

        // Gets user active cart
        const cart = cartModel.getUserCart(userId);

        if (!cart) {
            return res.json({ message: 'No active cart found', products: [] });
        }

        // Gets products in cart
        const products = cartModel.getCartProducts(cart.id);

        res.json({ cartId: cart.id, products });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};


exports.updateQuantity = (req, res) => {
    try {
        const { productId, action } = req.body;
        const userId = 1;

        const cart = cartModel.getUserCart(userId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        if (action === 'increase') {
            cartModel.incrementQuantity(cart.id, productId);
        } else if (action === 'decrease') {
            cartModel.decrementQuantity(cart.id, productId);
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        res.json({ message: 'Quantity updated successfully' });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'Failed to update quantity' });
    }
};

exports.checkoutCart = (req, res) => {
    try {
        const userId = 1;
        const cart = cartModel.getUserCart(userId);
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cartModel.checkoutCart(cart.id);
        res.json({ message: 'Cart checked out successfully' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Failed to checkout' });
    }
};

exports.emptyCart = async (req, res) => {
    try {
        const userId = 1;
        const cart = cartModel.getUserCart(userId); // gets active cart
        if (!cart) {
            return res.status(400).json({ error: 'No active cart to empty' });
        }

        console.log(`Emptying cart with ID: ${cart.id}`);
        cartModel.abandonCart(cart.id); // Marks cart as abandoned
        res.json({ message: 'Cart emptied successfully', cartId: cart.id });
    } catch (error) {
        console.error('Error emptying cart:', error);
        res.status(500).json({ error: 'Failed to empty cart' });
    }
};





