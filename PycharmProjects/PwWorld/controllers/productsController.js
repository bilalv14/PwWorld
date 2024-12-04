const productsModel = require('../models/productsModel');

exports.getAllProducts = (req, res) => {
    try {
        const { category } = req.query;
        let products;

        if (category) {
            products = productsModel.getProductsByCategory(category);
        } else {
            products = productsModel.getAllProducts();
        }

        res.json(products);
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getAllCategories = (req, res) => {
    try {
        const categories = productsModel.getAllCategories();
        res.json(categories);
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

exports.getProductsByCategory = (req, res) => {
    try {
        const { id } = req.params; // Category ID
        const products = productsModel.getProductsByCategory(id);
        res.json(products);
    } catch (error) {
        console.error('Error in getProductsByCategory:', error);
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
};

exports.getProductDetails = (req, res) => {
    try {
        const { id } = req.params; // Product ID
        const product = productsModel.getProductDetails(id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error in getProductDetails:', error);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
};

exports.sortProducts = (req, res) => {
    try {
        const { criteria } = req.params;
        const products = productsModel.sortProducts(criteria);
        res.json(products);
    } catch (error) {
        console.error('Error in sortProducts:', error);
        res.status(500).json({ error: 'Failed to sort products' });
    }
};

exports.sortProductsByCategory = (req, res) => {
    try {
        const { criteria, id } = req.params;
        const products = productsModel.sortProductsByCategory(criteria, id);
        res.json(products);
    } catch (error) {
        console.error('Error in sortProductsByCategory:', error);
        res.status(500).json({ error: 'Failed to sort products by category' });
    }
};
