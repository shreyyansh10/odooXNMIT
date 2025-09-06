import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, loading, searchQuery }) => {
  if (loading) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <div className="loading-grid">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="product-card-skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-price"></div>
                  <div className="skeleton-seller"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="product-grid-section">
        <div className="product-grid-container">
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3 className="no-results-title">
              {searchQuery ? `No results found for "${searchQuery}"` : 'No products available'}
            </h3>
            <p className="no-results-message">
              {searchQuery 
                ? 'Try adjusting your search terms or browse our categories'
                : 'Check back later for new sustainable products'
              }
            </p>
            {searchQuery && (
              <button 
                className="clear-search-button"
                onClick={() => window.location.reload()}
              >
                Clear Search
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        <div className="results-header">
          <h2 className="results-title">
            {searchQuery ? `Results for "${searchQuery}"` : 'Featured Products'}
          </h2>
          <div className="results-count">
            {products.length} {products.length === 1 ? 'item' : 'items'} found
          </div>
        </div>
        
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
