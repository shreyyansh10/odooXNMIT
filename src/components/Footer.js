import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <span className="logo-icon">🌱</span>
              <span className="logo-text">EcoFinds</span>
            </div>
            <p className="footer-description">
              Connecting conscious consumers with sustainable second-hand products. 
              Join the circular economy and make a positive impact on our planet.
            </p>
            <div className="social-links">
              <button className="social-link" aria-label="Facebook">
                📘
              </button>
              <button className="social-link" aria-label="Twitter">
                🐦
              </button>
              <button className="social-link" aria-label="Instagram">
                📷
              </button>
              <button className="social-link" aria-label="LinkedIn">
                💼
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/sell">Sell Items</Link></li>
              <li><Link to="/buy">Buy Items</Link></li>
              <li><Link to="/sustainability">Sustainability</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3 className="footer-title">Legal</h3>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h3 className="footer-title">Stay Updated</h3>
            <p className="newsletter-description">
              Get the latest updates on new products and sustainability tips.
            </p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © 2024 EcoFinds. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <span className="impact-stats">
                🌍 <strong>156</strong> items saved from landfill
              </span>
              <span className="impact-stats">
                ♻️ <strong>2.3K</strong> kg CO₂ saved
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
