-- ==========================================
-- 1️⃣ See all products
-- Lists all products with ID, title, price, and category
-- Ordered by product_id for consistent output
-- ==========================================
SELECT product_id, title, price, category 
FROM products 
ORDER BY product_id;

-- ==========================================
-- 2️⃣ Search for "Laptop"
-- Full-text search in both title and description
-- ==========================================
SELECT * 
FROM products 
WHERE to_tsvector('english', title || ' ' || description) @@ plainto_tsquery('Laptop');

-- ==========================================
-- 3️⃣ Filter products by category
-- Case-insensitive search for Electronics category
-- ==========================================
SELECT * 
FROM products 
WHERE category ILIKE 'Electronics';

-- ==========================================
-- 4️⃣ View a user’s cart
-- Shows product title, price, quantity, and total price
-- For user_id = 1 (Riya)
-- ==========================================
SELECT c.cart_id, p.title, p.price, c.quantity, 
       (p.price * c.quantity) AS total_price
FROM cart c
JOIN products p ON c.product_id = p.product_id
WHERE c.user_id = 1
ORDER BY c.cart_id;

-- ==========================================
-- 5️⃣ View previous purchases
-- Shows product title, price, quantity, total price, and purchase date
-- Ordered by most recent purchase first
-- ==========================================
SELECT p.title, p.price, pur.quantity, 
       (p.price * pur.quantity) AS total_price, 
       pur.purchase_date
FROM purchases pur
JOIN products p ON pur.product_id = p.product_id
WHERE pur.user_id = 1
ORDER BY pur.purchase_date DESC;

-- ==========================================
-- Optional Extra Queries for Testing
-- ==========================================

-- Total cart value for a user
SELECT SUM(p.price * c.quantity) AS total_cart_value
FROM cart c
JOIN products p ON c.product_id = p.product_id
WHERE c.user_id = 1;

-- Most popular product (by total quantity sold)
SELECT p.title, SUM(pur.quantity) AS total_sold
FROM purchases pur
JOIN products p ON pur.product_id = p.product_id
GROUP BY p.title
ORDER BY total_sold DESC
LIMIT 5;

-- Total revenue per category
SELECT p.category, SUM(p.price * pur.quantity) AS total_revenue
FROM purchases pur
JOIN products p ON pur.product_id = p.product_id
GROUP BY p.category
ORDER BY total_revenue DESC;
