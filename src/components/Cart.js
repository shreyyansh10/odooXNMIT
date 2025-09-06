import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Header from './Header';
import Footer from './Footer';
import './Cart.css';

const Cart = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Navigate to checkout page (you can implement this later)
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Header user={user} isAuthenticated={isAuthenticated} />
        
        <main className="cart-main">
          <div className="cart-container">
            <div className="cart-header">
              <h1>Shopping Cart</h1>
              <div className="cart-breadcrumb">
                <Link to="/" className="breadcrumb-link">Home</Link>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">Cart</span>
              </div>
            </div>

            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <button onClick={handleContinueShopping} className="continue-shopping-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header user={user} isAuthenticated={isAuthenticated} />
      
      <main className="cart-main">
        <div className="cart-container">
          <div className="cart-header">
            <h1>Shopping Cart ({getTotalItems()} items)</h1>
            <div className="cart-breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">Cart</span>
            </div>
          </div>

          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <div className="item-meta">
                      <span className="item-seller">Sold by {item.seller}</span>
                      <span className="item-condition">{item.condition}</span>
                      <span className="item-category">{item.category}</span>
                    </div>
                    <div className="item-price">${item.price}</div>
                  </div>

                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <div className="quantity-controls">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="quantity-btn"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id={`quantity-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                        className="quantity-input"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="quantity-btn"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="item-total">
                    <div className="total-price">${(item.price * item.quantity).toFixed(2)}</div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="remove-btn"
                      title="Remove item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Summary</h3>
                
                <div className="summary-row">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                
                <div className="summary-row">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>

                <div className="summary-actions">
                  <button onClick={handleCheckout} className="checkout-btn">
                    Proceed to Checkout
                  </button>
                  <button onClick={clearCart} className="clear-cart-btn">
                    Clear Cart
                  </button>
                </div>

                <div className="security-info">
                  <div className="security-item">
                    <span className="security-icon">🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="security-item">
                    <span className="security-icon">↩️</span>
                    <span>30-day returns</span>
                  </div>
                  <div className="security-item">
                    <span className="security-icon">🚚</span>
                    <span>Free shipping</span>
                  </div>
                </div>
              </div>

              <div className="continue-shopping">
                <Link to="/" className="continue-link">
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
