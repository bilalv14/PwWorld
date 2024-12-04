DROP TABLE IF EXISTS CartProducts;
DROP TABLE IF EXISTS Carts;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_type TEXT CHECK(user_type IN ('admin', 'shopper')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    priority_level INTEGER
);

CREATE TABLE Products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    price REAL NOT NULL,
    category_id INTEGER NOT NULL,
    is_featured BOOLEAN DEFAULT 0,
    protein REAL NOT NULL , -- Amount of protein in grams
    caffeine REAL NOT NULL, -- Amount of caffeine in milligrams
    electrolytes REAL NOT NULL, -- Amount of electro in milligrams
    FOREIGN KEY (category_id) REFERENCES Categories(id)
);

CREATE TABLE Carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    status TEXT CHECK(status IN ('new', 'abandoned', 'purchased')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE CartProducts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    FOREIGN KEY (cart_id) REFERENCES Carts(id),
    FOREIGN KEY (product_id) REFERENCES Products(id)
);



INSERT INTO Categories (name, priority_level) VALUES ('Preworkout', 1);
INSERT INTO Categories (name, priority_level) VALUES ('Protein Powder', 2);
INSERT INTO Categories (name, priority_level) VALUES ('Energy Drinks', 3);

INSERT INTO Products (name, description, image_url, price, category_id, protein, caffeine, electrolytes)
VALUES ('UltraBoost Energy', 'High-performance preworkout supplement', 'images/product1.jpg', 29.99, 1, 0.0, 300.0, 100.0);

INSERT INTO Products (name, description, image_url, price, category_id, protein, caffeine, electrolytes)
VALUES ('MaxCharge Performance', 'Boosts energy and focus for intense workouts', 'images/product2.jpg', 34.99, 1, 0.0, 250.0, 150.0);

INSERT INTO Products (name, description, image_url, price, category_id, protein, caffeine, electrolytes)
VALUES ('ProBuilder Protein', 'Supports muscle recovery and growth', 'images/product3.jpg', 44.99, 2, 30.0, 0.0, 50.0);

INSERT INTO Users (id, name, email, password, user_type)
VALUES (1, 'Test User', 'testuser@example.com', 'password123', 'shopper');
