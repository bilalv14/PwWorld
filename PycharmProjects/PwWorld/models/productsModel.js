const db = require('better-sqlite3')('./DB/PwWorld.db');

exports.getAllProducts = () => {
    try {
        console.log('Executing query: SELECT * FROM Products');
        const products = db.prepare('SELECT * FROM Products').all();
        console.log('Products fetched from database:', products);
        return products;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

exports.getAllCategories = () => {
    try {
        return db.prepare('SELECT * FROM Categories').all();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

exports.getProductsByCategory = (categoryId) => {
    try {
        console.log(`Fetching products for category ID: ${categoryId}`);
        const products = db.prepare('SELECT * FROM Products WHERE category_id = ?').all(categoryId);
        console.log(`Products fetched for category ID ${categoryId}:`, products);
        return products;
    } catch (error) {
        console.error(`Error fetching products by category ID ${categoryId}:`, error);
        throw error;
    }
};

exports.getProductDetails = (productId) => {
    try {
        return db.prepare('SELECT * FROM Products WHERE id = ?').get(productId);
    } catch (error) {
        console.error(`Error fetching product details for product ID ${productId}:`, error);
        throw error;
    }
};

exports.sortProducts = (criteria) => {
    let query;

    switch (criteria) {
        case 'price-asc':
            query = 'SELECT * FROM Products ORDER BY price ASC';
            break;
        case 'price-desc':
            query = 'SELECT * FROM Products ORDER BY price DESC';
            break;
        case 'caffeine':
            query = 'SELECT * FROM Products ORDER BY caffeine DESC';
            break;
        case 'protein':
            query = 'SELECT * FROM Products ORDER BY protein DESC';
            break;
        case 'electrolytes':
            query = 'SELECT * FROM Products ORDER BY electrolytes DESC';
            break;
        default:
            throw new Error('Invalid sorting criteria');
    }

    try {
        console.log(`Sorting products by criteria: ${criteria}`);
        const sortedProducts = db.prepare(query).all();
        console.log(`Sorted products by ${criteria}:`, sortedProducts);
        return sortedProducts;
    } catch (error) {
        console.error(`Error sorting products by ${criteria}:`, error);
        throw error;
    }
};

// Sorts products by category
exports.sortProductsByCategory = (criteria, categoryId) => {
    let query;

    switch (criteria) {
        case 'price-asc':
            query = 'SELECT * FROM Products WHERE category_id = ? ORDER BY price ASC';
            break;
        case 'price-desc':
            query = 'SELECT * FROM Products WHERE category_id = ? ORDER BY price DESC';
            break;
        case 'caffeine':
            query = 'SELECT * FROM Products WHERE category_id = ? ORDER BY caffeine DESC';
            break;
        case 'protein':
            query = 'SELECT * FROM Products WHERE category_id = ? ORDER BY protein DESC';
            break;
        case 'electrolytes':
            query = 'SELECT * FROM Products WHERE category_id = ? ORDER BY electrolytes DESC';
            break;
        default:
            throw new Error('Invalid sorting criteria');
    }

    try {
        console.log(`Sorting products in category ${categoryId} by criteria: ${criteria}`);
        const sortedProducts = db.prepare(query).all(categoryId);
        console.log(`Sorted products in category ${categoryId} by ${criteria}:`, sortedProducts);
        return sortedProducts;
    } catch (error) {
        console.error(`Error sorting products in category ${categoryId} by ${criteria}:`, error);
        throw error;
    }
};

// Admin functions


exports.deleteProduct = (id) => {
    try {
        console.log(`Deleting product with ID: ${id}`);
        return db.prepare('DELETE FROM Products WHERE id = ?').run(id);
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};

exports.addProduct = (product) => {
    try {
        console.log('Adding new product:', product); // Debugging log
        return db.prepare(`
            INSERT INTO Products (name, description, image_url, price, category_id, is_featured, protein, caffeine, electrolytes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            product.name,
            product.description,
            product.image_url,
            product.price,
            product.category_id,
            product.is_featured || 0,
            product.protein || 0,
            product.caffeine || 0,
            product.electrolytes || 0
        );
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

exports.updateProduct = (id, product) => {
    try {
        console.log(`Updating product with ID: ${id}`, product);
        return db.prepare(`
            UPDATE Products
            SET name = ?, description = ?, image_url = ?, price = ?, category_id = ?, is_featured = ?, protein = ?, caffeine = ?, electrolytes = ?
            WHERE id = ?
        `).run(
            product.name,
            product.description,
            product.image_url,
            product.price,
            product.category_id,
            product.is_featured,
            product.protein,
            product.caffeine,
            product.electrolytes,
            id
        );
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
};
