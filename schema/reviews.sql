DROP TABLE reviews;

CREATE TABLE reviews (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id),
	product_id INT NOT NULL REFERENCES products(id),
	comment TEXT NOT NULL,
	star SMALLINT NOT NULL
);