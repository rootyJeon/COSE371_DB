DROP TABLE brand_product;

CREATE TABLE brand_product (
	brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
	product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

	PRIMARY KEY (brand_id, product_id)
);