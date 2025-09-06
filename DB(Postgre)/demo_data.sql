-- Users
INSERT INTO users (username, email, password_hash) VALUES
('riya', '23ce105@charusat.edu.in', 'demo_hash'),
('jahnavi', '23ce095@charusat.edu.in', 'demo_hash'),
('isha', '23ce118@charusat.edu.in', 'demo_hash');

-- Products
INSERT INTO products (user_id, title, description, category, price, image_url) VALUES
(1, 'Dell Inspiron 15', '8GB RAM, 256GB SSD, well maintained', 'Electronics', 25000, 'https://placehold.co/600x400'),
(2, 'IKEA Study Table', 'Solid wood, minor scratches', 'Furniture', 3500, 'https://placehold.co/600x400'),
(3, 'Levi’s Denim Jacket', 'Size M, barely used', 'Clothing', 1200, 'https://placehold.co/600x400'),
(1, 'Kindle Paperwhite', '10th gen, perfect for reading', 'Electronics', 6000, 'https://placehold.co/600x400'),
(2, 'Cricket Bat', 'English willow, lightly used', 'Sports', 1800, 'https://placehold.co/600x400');

-- Cart with quantities
INSERT INTO cart (user_id, product_id, quantity) VALUES
(1, 2, 2), -- Riya added 2 tables
(1, 5, 1), -- Riya added 1 bat
(2, 1, 1); -- Jahnavi added 1 laptop

-- Purchases with quantities
INSERT INTO purchases (user_id, product_id, quantity) VALUES
(3, 3, 1), -- Isha bought 1 jacket
(1, 2, 2); -- Riya bought 2 tables
