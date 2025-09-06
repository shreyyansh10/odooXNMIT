import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Header';
import SearchSection from './SearchSection';
import BannerSection from './BannerSection';
import CategoriesSection from './CategoriesSection';
import ProductGrid from './ProductGrid';
import Footer from './Footer';
import './LandingPage.css';

const LandingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    const mockProducts = [
      {
        id: 1,
        title: "Vintage Denim Jacket",
        price: 45,
        category: "Clothing",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=400&fit=crop",
        condition: "Excellent",
        seller: "EcoFashion",
        location: "New York"
      },
      {
        id: 2,
        title: "Sustainable Bamboo Phone Case",
        price: 25,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
        condition: "Good",
        seller: "GreenTech",
        location: "California"
      },
      {
        id: 3,
        title: "Handmade Ceramic Mug",
        price: 18,
        category: "Home & Garden",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop",
        condition: "Like New",
        seller: "ArtisanCraft",
        location: "Portland"
      },
      {
        id: 4,
        title: "Upcycled Wooden Bookshelf",
        price: 120,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        condition: "Good",
        seller: "ReclaimedWood",
        location: "Seattle"
      },
      {
        id: 5,
        title: "Organic Cotton Tote Bag",
        price: 15,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        condition: "Excellent",
        seller: "EcoBags",
        location: "Austin"
      },
      {
        id: 6,
        title: "Solar-Powered LED Lamp",
        price: 65,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        condition: "Like New",
        seller: "SolarTech",
        location: "Denver"
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (sortBy) => {
    let sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        sorted.sort((a, b) => a.id - b.id);
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleFilter = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="landing-page">
      <Header 
        user={user} 
        isAuthenticated={isAuthenticated}
        cartCount={0} // You can implement cart functionality later
      />
      
      <main className="landing-main">
        <SearchSection 
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onSort={handleSort}
          onFilter={handleFilter}
        />
        
        <BannerSection />
        
        <CategoriesSection onCategorySelect={handleFilter} />
        
        <ProductGrid 
          products={filteredProducts}
          loading={loading}
          searchQuery={searchQuery}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
