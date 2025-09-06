-- Step 1 – Create Database & User
--Run these queries first in pgAdmin 4 → Query Tool (connect to your postgres server):

-- Create the database
CREATE DATABASE ecofinds_db;

-- Create a dedicated user
CREATE USER ecofinds WITH PASSWORD 'ecofinds_pass';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE ecofinds_db TO ecofinds;

--Then connect to the new ecofinds_db before running the rest.

--Step 2 – Tables & Queries
--1. Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--2. Products Table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--3. Cart Table (Updated with Quantity)
DROP TABLE IF EXISTS cart CASCADE;

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);
--4. Purchases Table (Updated with Quantity)
DROP TABLE IF EXISTS purchases CASCADE;

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
--5. User Profiles Table (Optional)
CREATE TABLE user_profiles (
    profile_id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    bio TEXT,
    location VARCHAR(100),
    phone VARCHAR(20)
);

-- Step 3 – Indexes (for efficiency)
-- Faster lookups
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_products_category ON products (category);

-- Full-text search on product title
CREATE INDEX idx_products_title_fts ON products USING gin (to_tsvector('english', title));




