import React, { useState } from 'react';
import './SearchSection.css';

const SearchSection = ({ onSearch, searchQuery, onSort, onFilter }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    onSearch(value);
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const groupOptions = [
    { value: 'none', label: 'No Grouping' },
    { value: 'category', label: 'Group by Category' },
    { value: 'price', label: 'Group by Price Range' },
    { value: 'condition', label: 'Group by Condition' }
  ];

  return (
    <section className="search-section">
      <div className="search-container">
        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search for sustainable products..."
              value={localSearchQuery}
              onChange={handleSearchChange}
            />
            <button type="submit" className="search-button">
              🔍
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="action-buttons">
          {/* Sort Button */}
          <div className="dropdown">
            <button 
              className="action-button sort"
              onClick={() => setShowSortMenu(!showSortMenu)}
            >
              <span className="button-icon">📊</span>
              Sort
              <span className="dropdown-arrow">▼</span>
            </button>
            {showSortMenu && (
              <div className="dropdown-menu">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => {
                      onSort(option.value);
                      setShowSortMenu(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Button */}
          <div className="dropdown">
            <button 
              className="action-button filter"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <span className="button-icon">🔧</span>
              Filter
              <span className="dropdown-arrow">▼</span>
            </button>
            {showFilterMenu && (
              <div className="dropdown-menu">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => {
                      onFilter(option.value);
                      setShowFilterMenu(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Group By Button */}
          <div className="dropdown">
            <button 
              className="action-button group"
              onClick={() => setShowGroupMenu(!showGroupMenu)}
            >
              <span className="button-icon">📋</span>
              Group By
              <span className="dropdown-arrow">▼</span>
            </button>
            {showGroupMenu && (
              <div className="dropdown-menu">
                {groupOptions.map(option => (
                  <button
                    key={option.value}
                    className="dropdown-item"
                    onClick={() => setShowGroupMenu(false)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
