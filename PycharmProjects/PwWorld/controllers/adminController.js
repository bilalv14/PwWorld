const productModel = require('../models/productsModel');

exports.getAllProducts = (req, res) => {
    try {
        const products = productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

exports.getProductById = (req, res) => {
    try {
        const { id } = req.params; // Gets product ID
        const product = productModel.getProductDetails(id); // Gets product details from model

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' }); // Handle product not found
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Failed to fetch product' }); // Handle server error
    }
};


exports.deleteProduct = (req, res) => {
    try {
        const { id } = req.params;
        productModel.deleteProduct(id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

exports.addProduct = (req, res) => {
    try {
        const product = req.body;
        productModel.addProduct(product);
        res.json({ message: 'Product added successfully' });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Failed to add product' });
    }
};

exports.updateProduct = (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        productModel.updateProduct(id, updatedProduct);
        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
};

// Bulk uploads
exports.bulkUpload = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileContent = req.file.buffer.toString('utf-8');
        let products;

        if (req.file.originalname.endsWith('.json')) {
            products = JSON.parse(fileContent);
        } else if (req.file.originalname.endsWith('.csv')) {
            products = parseCSV(fileContent);
        } else {
            return res.status(400).json({ error: 'Unsupported file format' });
        }

        const categories = productModel.getAllCategories();

        products.forEach((product) => {
            if (!categories.some((category) => category.id === product.category_id)) {
                throw new Error(
                    `Invalid category_id: ${product.category_id} for product: ${product.name}`
                );
            }

            delete product.id;
            productModel.addProduct(product);
        });

        res.json({ message: 'Bulk upload successful', productsUploaded: products.length });
    } catch (error) {
        console.error('Error during bulk upload:', error);
        res.status(500).json({ error: error.message || 'Failed to process bulk upload' });
    }
};


const parseCSV = (content) => {
    const rows = content.split('\n').filter(row => row.trim() !== '');
    const headers = rows.shift().split(',');

    return rows.map((row) => {
        const values = row.split(',');
        const product = {};
        headers.forEach((header, index) => {
            product[header.trim()] = values[index]?.trim();
        });
        return product;
    });
};
