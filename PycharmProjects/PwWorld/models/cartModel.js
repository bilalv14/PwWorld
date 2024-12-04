const db = require('better-sqlite3')('./DB/PwWorld.db');

exports.getUserCart = (userId) => {
    // Gets current cart for user with new status
    return db.prepare('SELECT * FROM Carts WHERE user_id = ? AND status = \'new\'').get(userId);
};

exports.createCart = (userId) => {
    // Check if user exists
    const user = db.prepare('SELECT * FROM Users WHERE id = ?').get(userId);
    if (!user) {
        throw new Error(`User with id ${userId} does not exist`);
    }

    // Creates a new cart
    return db.prepare('INSERT INTO Carts (user_id, status) VALUES (?, \'new\')').run(userId);
};

exports.addToCart = (cartId, productId) => {
    // Checks if product exists
    const product = db.prepare('SELECT * FROM Products WHERE id = ?').get(productId);
    if (!product) {
        throw new Error(`Product with id ${productId} does not exist`);
    }

    // Checks if  product is already in cart
    const existingProduct = db
        .prepare('SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?')
        .get(cartId, productId);

    if (existingProduct) {
        return db
            .prepare('UPDATE CartProducts SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?')
            .run(cartId, productId);
    } else {
        return db
            .prepare('INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, 1)')
            .run(cartId, productId);
    }
};

exports.getCartProducts = (cartId) => {
    // Gets all products in  cart
    return db.prepare(`
        SELECT cp.id AS cart_product_id, p.*, cp.quantity 
        FROM CartProducts cp
        JOIN Products p ON cp.product_id = p.id
        WHERE cp.cart_id = ?
    `).all(cartId);
};

exports.incrementQuantity = (cartId, productId) => {
    return db.prepare('UPDATE CartProducts SET quantity = quantity + 1 WHERE cart_id = ? AND product_id = ?')
        .run(cartId, productId);
};

exports.decrementQuantity = (cartId, productId) => {
    const currentQuantity = db.prepare('SELECT quantity FROM CartProducts WHERE cart_id = ? AND product_id = ?')
        .get(cartId, productId)?.quantity;

    if (currentQuantity > 1) {
        return db.prepare('UPDATE CartProducts SET quantity = quantity - 1 WHERE cart_id = ? AND product_id = ?')
            .run(cartId, productId);
    } else {
        return db.prepare('DELETE FROM CartProducts WHERE cart_id = ? AND product_id = ?')
            .run(cartId, productId);
    }
};

exports.checkoutCart = (cartId) => {
    try {
        // Updates cart to puchased
        return db
            .prepare('UPDATE Carts SET status = \'purchased\' WHERE id = ?')
            .run(cartId);
    } catch (error) {
        console.error('Error during checkout in cartModel:', error);
        throw error;
    }
};


exports.getActiveCartId = (userId) => {
    try {
        console.log('Fetching active cart for user ID:', userId);
        const cart = db.prepare('SELECT id FROM Carts WHERE user_id = ? AND status = \'new\'').get(userId);
        console.log('Active cart retrieved:', cart);
        return cart ? cart.id : null;
    } catch (error) {
        console.error('Error fetching active cart ID:', error);
        throw error;
    }
};

exports.abandonCart = (cartId) => {
    try {
        console.log(`Marking cart ID ${cartId} as abandoned.`);
        // Changes cart status abandoned
        db.prepare('UPDATE Carts SET status = \'abandoned\' WHERE id = ?').run(cartId);

        db.prepare('DELETE FROM CartProducts WHERE cart_id = ?').run(cartId);
        console.log(`Cart ID ${cartId} marked as abandoned and products removed.`);
    } catch (error) {
        console.error('Error abandoning cart:', error);
        throw error;
    }
};





