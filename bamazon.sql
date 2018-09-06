DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Titlest 917 D2 Driver', 'Golf', 400, 50),
    ('Basket Ball', 'Sports', 20, 15),
    ('Nike Shoes', 'Footwear', 120, 25),
    ('Banana Republic Chinos', 'Clothes', 50, 30),
    ('Notebook', 'School Supplies', 5, 100),
    ('Footjoy Shoes', 'Golf', 90, 55),
    ('Callaway Epic Driver', 'Golf', 350, 51),
    ('Shirt', 'Clothes', 12, 40),
    ('Mac Book Pro', 'Tech', 2000, 30),
    ('Hat', 'Clothes', 20, 60);