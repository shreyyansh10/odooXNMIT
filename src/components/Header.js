// Header.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"
import CartDrawer from "./CartDrawer";

import "./Header.css";

const Header = ({ cartCount = 0, cartItems = [] }) => {
  const { user, isAuthenticated, logout } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Mobile Menu Button */}
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon"><span className="logo-leaf">🌱</span></div>
            <span className="logo-text">EcoFinds</span>
          </Link>

          {/* Navigation */}
          <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
            <ul className="nav-list">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/categories" className="nav-link">Categories</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>

          {/* Right Side Actions */}
          <div className="header-actions">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="cart-link"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <div className="cart-icon">
                🛒
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </div>
            </button>

            {/* User Profile */}
            {isAuthenticated ? (
              <div className="user-profile">
                <button
                  className="profile-button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-label="User profile"
                >
                  <div className="profile-avatar">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </div>
                </button>
                {isProfileOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-info">
                      <div className="profile-name">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="profile-email">{user?.email}</div>
                    </div>
                    <div className="profile-divider"></div>
                    <Link to="/profile" className="profile-link">My Profile</Link>
                    <Link to="/orders" className="profile-link">My Orders</Link>
                    <Link to="/sell" className="profile-link">Sell Items</Link>
                    <div className="profile-divider"></div>
                    <button
                      onClick={handleLogout}
                      className="profile-link logout"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-button login">Login</Link>
                <Link to="/signup" className="auth-button signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />
    </>
  );
};

export default Header;
