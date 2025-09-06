import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent':
        return '#22c55e';
      case 'good':
        return '#3b82f6';
      case 'like new':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image-container">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            onError={handleImageError}
          />
        ) : (
          <div className="product-image-placeholder">
            <div className="placeholder-icon">📦</div>
          </div>
        )}
        
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
          aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>
        
        <div className="product-condition" style={{ backgroundColor: getConditionColor(product.condition) }}>
          {product.condition}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-price">
          <span className="price-symbol">$</span>
          <span className="price-amount">{product.price}</span>
        </div>
        
        <div className="product-details">
          <div className="product-seller">
            <span className="seller-icon">👤</span>
            <span className="seller-name">{product.seller}</span>
          </div>
          
          <div className="product-location">
            <span className="location-icon">📍</span>
            <span className="location-name">{product.location}</span>
          </div>
        </div>
        
        <div className="product-category">
          <span className="category-tag">{product.category}</span>
        </div>
        
        <div className="product-actions">
          <button className="action-button primary" onClick={handleViewDetails}>
            View Details
          </button>
          <button className="action-button secondary">
            Message Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
