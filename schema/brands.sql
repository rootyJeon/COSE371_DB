DROP TABLE brands;

CREATE TABLE brands (
	id SERIAL PRIMARY KEY,
	brand_name VARCHAR(20) UNIQUE,
	user_id INT NOT NULL REFERENCES ON DELETE CASCADE
);