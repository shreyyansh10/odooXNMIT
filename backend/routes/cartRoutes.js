const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');
const { verifyJWT } = require('../middleware/auth.Middleware');

// All cart routes require authentication
router.use(verifyJWT);

router.get('/', getCart); // Get user's cart
router.post('/', addToCart); // Add item to cart
router.put('/:productId', updateCartItem); // Update cart item quantity
router.delete('/:productId', removeFromCart); // Remove item from cart
router.delete('/', clearCart); // Clear entire cart

module.exports = router;
