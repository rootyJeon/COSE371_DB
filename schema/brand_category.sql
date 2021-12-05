DROP TABLE brand_category;

CREATE TABLE brand_category (
	brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
	category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,

	PRIMARY KEY(brand_id, category_id)
);