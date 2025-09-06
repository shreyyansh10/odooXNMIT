import React, { useState } from 'react';
import './CategoriesSection.css';

const CategoriesSection = ({ onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🏠', count: 156 },
    { id: 'clothing', name: 'Clothing', icon: '👕', count: 45 },
    { id: 'electronics', name: 'Electronics', icon: '📱', count: 23 },
    { id: 'home', name: 'Home & Garden', icon: '🏡', count: 34 },
    { id: 'furniture', name: 'Furniture', icon: '🪑', count: 18 },
    { id: 'accessories', name: 'Accessories', icon: '👜', count: 28 },
    { id: 'books', name: 'Books', icon: '📚', count: 12 },
    { id: 'sports', name: 'Sports', icon: '⚽', count: 15 }
  ];

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    onCategorySelect(categoryId);
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-card ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-info">
                <div className="category-name">{category.name}</div>
                <div className="category-count">{category.count} items</div>
              </div>
              <div className="category-arrow">→</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
