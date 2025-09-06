const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { verifyJWT } = require('../middleware/auth.Middleware');

// Public routes
router.get('/', getAllProducts); // Get all products with filters
router.get('/:id', getProductById); // Get single product

// Protected routes (Admin only)
router.post('/', verifyJWT, addProduct); // Add new product
router.put('/:id', verifyJWT, updateProduct); // Update product
router.delete('/:id', verifyJWT, deleteProduct); // Delete product

module.exports = router;
