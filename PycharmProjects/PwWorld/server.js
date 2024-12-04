const express = require('express');
const path = require('path');
const productsRoute = require('./routes/productRoutes'); // Products API
const cartRoute = require('./routes/cartRoutes'); // Cart API
const adminRoute = require('./routes/adminRoutes'); // Admin API

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Middleware for static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/products', productsRoute); // Products API endpoints
app.use('/api/cart', cartRoute); // Cart API endpoints
app.use('/api/admin', adminRoute); // Admin API endpoints

// HTML Pages
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/products.html'));
});

app.get('/details', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/details.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/cart.html'));
});

app.get('/admin/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-products.html'));
});

app.get('/admin/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/admin-upload.html'));
});

app.get('/admin/edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/product-edit.html'));
});

app.get('/admin/add', (req, res) => {
    res.redirect('/admin/edit');
});

app.get('/details/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/details.html'));
});

// invalid routes check
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
