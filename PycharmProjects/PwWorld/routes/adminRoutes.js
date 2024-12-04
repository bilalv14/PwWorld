const express = require('express');
const adminController = require('../controllers/adminController');
const multer = require('multer');
const router = express.Router();

// Fetches all products
router.get('/products', adminController.getAllProducts);

// Fetches a single product by ID
router.get('/products/:id', adminController.getProductById);

// Adding a new product
router.post('/products', adminController.addProduct);

// Updating an existing product
router.put('/products/:id', adminController.updateProduct);

// Deleting a product
router.delete('/products/:id', adminController.deleteProduct);

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Bulk uploading
router.post('/bulk-upload', upload.single('file'), adminController.bulkUpload);


module.exports = router;


