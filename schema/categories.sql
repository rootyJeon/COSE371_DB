DROP TABLE categories;

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(20) NOT NULL UNIQUE,
	info TEXT NOT NULL,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);