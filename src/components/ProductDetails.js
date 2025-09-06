import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Header from './Header';
import Footer from './Footer';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addToCart, cartItems } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Mock product data - in real app, this would come from API
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        title: "Vintage Denim Jacket",
        price: 45,
        originalPrice: 80,
        category: "Clothing",
        images: [
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=600&fit=crop"
        ],
        condition: "Excellent",
        seller: {
          name: "EcoFashion",
          rating: 4.8,
          location: "New York",
          joinDate: "2022-01-15"
        },
        description: "Beautiful vintage denim jacket in excellent condition. Perfect for sustainable fashion enthusiasts. Made from high-quality denim with classic styling that never goes out of fashion.",
        features: [
          "100% Cotton Denim",
          "Classic Fit",
          "Vintage Style",
          "Eco-Friendly"
        ],
        sustainability: {
          co2Saved: 12.5,
          waterSaved: 2.8,
          landfillDiverted: true
        },
        shipping: {
          free: true,
          estimatedDays: "2-3 days"
        },
        returnPolicy: "30-day return policy"
      },
      {
        id: 2,
        title: "Sustainable Bamboo Phone Case",
        price: 25,
        originalPrice: 40,
        category: "Electronics",
        images: [
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
          "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop"
        ],
        condition: "Good",
        seller: {
          name: "GreenTech",
          rating: 4.9,
          location: "California",
          joinDate: "2021-08-20"
        },
        description: "Eco-friendly bamboo phone case that provides excellent protection while being biodegradable. Perfect for environmentally conscious smartphone users.",
        features: [
          "100% Bamboo Material",
          "Biodegradable",
          "Shock Resistant",
          "Wireless Charging Compatible"
        ],
        sustainability: {
          co2Saved: 8.2,
          waterSaved: 1.5,
          landfillDiverted: true
        },
        shipping: {
          free: true,
          estimatedDays: "1-2 days"
        },
        returnPolicy: "14-day return policy"
      }
    ];

    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(product, quantity);
      // Show success message or animation
      setTimeout(() => setIsAddingToCart(false), 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // Add to cart and navigate to checkout
    addToCart(product, quantity);
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <Header user={user} isAuthenticated={isAuthenticated} />
      
      <main className="product-details-main">
        <div className="product-details-container">
          {/* Breadcrumb */}
          <nav className="breadcrumb">
            <button onClick={() => navigate('/')} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{product.category}</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{product.title}</span>
          </nav>

          <div className="product-details-content">
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img src={product.images[selectedImage]} alt={product.title} />
                <div className="image-badge">
                  <span className="condition-badge">{product.condition}</span>
                </div>
              </div>
              <div className="image-thumbnails">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-header">
                <h1 className="product-title">{product.title}</h1>
                <div className="product-rating">
                  <div className="stars">★★★★★</div>
                  <span className="rating-text">(4.8) • 127 reviews</span>
                </div>
              </div>

              <div className="product-pricing">
                <div className="price-current">${product.price}</div>
                {product.originalPrice && (
                  <div className="price-original">${product.originalPrice}</div>
                )}
                <div className="savings">
                  Save ${product.originalPrice - product.price} ({Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off)
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-features">
                <h3>Key Features</h3>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="sustainability-info">
                <h3>🌱 Environmental Impact</h3>
                <div className="impact-stats">
                  <div className="impact-item">
                    <span className="impact-icon">🌍</span>
                    <span className="impact-text">{product.sustainability.co2Saved}kg CO₂ saved</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-icon">💧</span>
                    <span className="impact-text">{product.sustainability.waterSaved}L water saved</span>
                  </div>
                  <div className="impact-item">
                    <span className="impact-icon">♻️</span>
                    <span className="impact-text">Diverted from landfill</span>
                  </div>
                </div>
              </div>

              <div className="seller-info">
                <h3>Seller Information</h3>
                <div className="seller-details">
                  <div className="seller-avatar">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div className="seller-text">
                    <div className="seller-name">{product.seller.name}</div>
                    <div className="seller-rating">★★★★★ {product.seller.rating}</div>
                    <div className="seller-location">📍 {product.seller.location}</div>
                  </div>
                </div>
              </div>

              <div className="shipping-info">
                <div className="shipping-item">
                  <span className="shipping-icon">🚚</span>
                  <span className="shipping-text">
                    {product.shipping.free ? 'Free shipping' : 'Shipping calculated at checkout'}
                  </span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-icon">⏱️</span>
                  <span className="shipping-text">Estimated delivery: {product.shipping.estimatedDays}</span>
                </div>
                <div className="shipping-item">
                  <span className="shipping-icon">↩️</span>
                  <span className="shipping-text">{product.returnPolicy}</span>
                </div>
              </div>

              {/* Add to Cart Section */}
              <div className="add-to-cart-section">
                <div className="quantity-selector">
                  <label htmlFor="quantity">Quantity:</label>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className={`add-to-cart-btn ${isAddingToCart ? 'adding' : ''}`}
                  >
                    {isAddingToCart ? 'Adding...' : '🛒 Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="buy-now-btn"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
