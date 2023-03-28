DROP TABLE products;

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users (id) ON DELETE CASCADE,
	category_id INT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	product_name VARCHAR(20) NOT NULL UNIQUE,
	price INT NOT NULL
);