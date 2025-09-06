const express = require('express');
const router = express.Router();
const {
  getPurchaseHistory,
  purchaseFromCart,
  purchaseProduct,
  getPurchaseStats
} = require('../controllers/purchaseController');
const { verifyJWT } = require('../middleware/auth.Middleware');

// All purchase routes require authentication
router.use(verifyJWT);

router.get('/', getPurchaseHistory); // Get purchase history
router.get('/stats', getPurchaseStats); // Get purchase statistics
router.post('/cart', purchaseFromCart); // Purchase all items from cart
router.post('/product', purchaseProduct); // Purchase single product

module.exports = router;
