import React from 'react';
import './BannerSection.css';

const BannerSection = () => {
  return (
    <section className="banner-section">
      <div className="banner-container">
        <div className="banner-content">
          <div className="banner-text">
            <h1 className="banner-title">
              Discover Sustainable
              <span className="highlight"> Second-Hand</span>
              Treasures
            </h1>
            <p className="banner-subtitle">
              Join the circular economy and find amazing pre-loved items 
              while reducing waste and supporting sustainability.
            </p>
            <div className="banner-stats">
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Items Saved</div>
              </div>
              <div className="stat">
                <div className="stat-number">5K+</div>
                <div className="stat-label">Happy Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">CO₂ Saved</div>
              </div>
            </div>
          </div>
          <div className="banner-image">
            <div className="banner-image-placeholder">
              <div className="floating-card card-1">
                <div className="card-icon">👕</div>
                <div className="card-text">Vintage Fashion</div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">🌱</div>
                <div className="card-text">Eco Products</div>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">♻️</div>
                <div className="card-text">Upcycled Items</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
