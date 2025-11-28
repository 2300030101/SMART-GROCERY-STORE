-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS transaction_items;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

-- USERS TABLE
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'staff', 'customer') NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PRODUCTS TABLE
CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CUSTOMERS TABLE
CREATE TABLE customers (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    debt DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    lastVisit DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TRANSACTIONS TABLE
CREATE TABLE transactions (
    id VARCHAR(50) PRIMARY KEY,
    date DATETIME NOT NULL,
    customerId VARCHAR(50),
    paymentMethod ENUM('cash', 'online', 'credit', 'split') NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    amountPaid DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE SET NULL
);

-- TRANSACTION_ITEMS TABLE
CREATE TABLE transaction_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transactionId VARCHAR(50) NOT NULL,
    productId VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (transactionId) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE RESTRICT
);

-- INSERT INITIAL DATA

-- Users
INSERT INTO users (username, password, role, name, phone) VALUES
('admin', '123', 'admin', 'Store Owner', '0000000000'),
('staff', '123', 'staff', 'Staff Member', '0000000000');

-- Customers
INSERT INTO customers (id, name, phone, debt, lastVisit) VALUES
('c1', 'Rahul Sharma', '9876543210', 500.00, '2024-03-10'),
('c2', 'Priya Patel', '9898989898', 0.00, '2024-03-12'),
('c3', 'Amit Singh', '9988776655', 1200.00, '2024-03-08');

-- Products
INSERT INTO products (id, name, category, price, stock, image) VALUES
-- Vegetables
('v1', 'Fresh Tomato', 'Vegetables', 40.00, 100, 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=500'),
('v2', 'Potato', 'Vegetables', 30.00, 200, 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=500'),
('v3', 'Red Onion', 'Vegetables', 60.00, 150, 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&q=80&w=500'),
('v4', 'Cauliflower', 'Vegetables', 45, 50, 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&q=80&w=500'),
('v5', 'Green Cabbage', 'Vegetables', 35, 60, 'https://images.unsplash.com/photo-1550953613-2d1d07817576?auto=format&fit=crop&q=80&w=500'),
('v6', 'Brinjal (Eggplant)', 'Vegetables', 50, 40, 'https://images.unsplash.com/photo-1623428454614-abaf00244e52?auto=format&fit=crop&q=80&w=500'),
('v7', 'Lady Finger (Okra)', 'Vegetables', 60, 45, 'https://images.unsplash.com/photo-1425543103437-43a85a8a5293?auto=format&fit=crop&q=80&w=500'),
('v8', 'Carrot', 'Vegetables', 55, 80, 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=500'),
-- Snacks
('s1', 'Lays Chips', 'Snacks', 20.00, 50, 'https://images.unsplash.com/photo-1566478919030-26d9c286df9c?auto=format&fit=crop&q=80&w=500'),
('s2', 'Kurkure', 'Snacks', 20.00, 50, 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&q=80&w=500'),
('s3', 'Bingo Chips', 'Snacks', 20.00, 45, 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&q=80&w=500'),
('s4', 'Haldiram Mixture', 'Snacks', 50.00, 30, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=500'),
('s10', 'Parle-G', 'Snacks', 10, 100, 'https://images.unsplash.com/photo-1590080874088-e564811bd9e8?auto=format&fit=crop&q=80&w=500'),
('s16', 'Maggi', 'Snacks', 14, 150, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=500'),
('s19', 'Dairy Milk', 'Snacks', 40, 80, 'https://images.unsplash.com/photo-1623356300958-f9b6a12b97c4?auto=format&fit=crop&q=80&w=500'),
-- Beverages
('b1', 'Coca-Cola (500ml)', 'Beverages', 45.00, 50, 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500'),
('b2', 'Sprite (500ml)', 'Beverages', 45.00, 50, 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=500'),
('b7', 'Frooti', 'Beverages', 20.00, 60, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&q=80&w=500'),
('b10', 'Real Juice (1L)', 'Beverages', 110.00, 20, 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=500'),
('b12', 'Red Bull', 'Beverages', 125, 30, 'https://images.unsplash.com/photo-1551500226-b50b653e33e8?auto=format&fit=crop&q=80&w=500'),
('b16', 'Bisleri Water (1L)', 'Beverages', 20, 100, 'https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=500'),
-- Staples
('st1', 'Rice (1kg)', 'Staples', 60.00, 100, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=500'),
('st2', 'Wheat Flour (Atta 1kg)', 'Staples', 45.00, 80, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=500'),
('st3', 'Sugar (1kg)', 'Staples', 44.00, 90, 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&q=80&w=500'),
('st4', 'Salt (1kg)', 'Staples', 25.00, 100, 'https://images.unsplash.com/photo-1518110925495-5c9ebdb14902?auto=format&fit=crop&q=80&w=500'),
('st5', 'Toor Dal (1kg)', 'Staples', 140.00, 50, 'https://images.unsplash.com/photo-1585996656736-2580795c4791?auto=format&fit=crop&q=80&w=500'),
('st11', 'Sunflower Oil (1L)', 'Staples', 160.00, 40, 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&q=80&w=500'),
('st23', 'Tea Powder', 'Staples', 120.00, 60, 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=500'),
('st24', 'Coffee Powder', 'Staples', 150.00, 50, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=500'),
-- Household
('h1', 'Detergent Powder', 'Household', 90.00, 40, 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&q=80&w=500'),
('h3', 'Dishwash Gel', 'Household', 110.00, 35, 'https://images.unsplash.com/photo-1585832047055-e7a8e8331182?auto=format&fit=crop&q=80&w=500'),
('h7', 'Toilet Cleaner', 'Household', 90.00, 40, 'https://images.unsplash.com/photo-1584622050111-993a426fbf0a?auto=format&fit=crop&q=80&w=500'),
('h10', 'Bath Soap', 'Household', 35.00, 100, 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=500'),
('h12', 'Toothpaste', 'Household', 65.00, 60, 'https://images.unsplash.com/photo-1559591937-e1dc3771a2e1?auto=format&fit=crop&q=80&w=500'),
('h13', 'Toothbrush', 'Household', 30.00, 80, 'https://images.unsplash.com/photo-1629219356834-8b1e4f451475?auto=format&fit=crop&q=80&w=500'),
('h14', 'Handwash', 'Household', 85.00, 40, 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?auto=format&fit=crop&q=80&w=500'),
-- Stationery
('stn1', 'Notebook (Long Book)', 'Stationery', 60.00, 100, 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=500'),
('stn2', 'Ball Pens (Pack of 5)', 'Stationery', 50.00, 100, 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=500'),
('stn3', 'Pencils (Pack of 10)', 'Stationery', 50.00, 80, 'https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&q=80&w=500'),
('stn4', 'Eraser & Sharpener Set', 'Stationery', 20.00, 100, 'https://images.unsplash.com/photo-1452838384813-2d2c77d48347?auto=format&fit=crop&q=80&w=500'),
('stn8', 'Fevicol (100g)', 'Stationery', 45.00, 60, 'https://images.unsplash.com/photo-1616422830846-5d9c22e4d026?auto=format&fit=crop&q=80&w=500'),
('stn10', 'A4 Paper Ream (500 Sheets)', 'Stationery', 350.00, 25, 'https://images.unsplash.com/photo-1586075010923-2dd45eeed8bd?auto=format&fit=crop&q=80&w=500');
