DROP TABLE reviews;
DROP TABLE brand_product;
DROP TABLE brand_category;
DROP TABLE products;
DROP TABLE categories;
DROP TABLE brands;
DROP TABLE users;

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	userName VARCHAR(20) NOT NULL,
	pw VARCHAR(15) NOT NULL,
	displayName VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE brands (
	id SERIAL PRIMARY KEY,
	brand_name VARCHAR(20) NOT NULL UNIQUE,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE categories (
	id SERIAL PRIMARY KEY,
	category_name VARCHAR(20) NOT NULL UNIQUE,
	info TEXT NOT NULL,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users (id),
	category_id INT NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
	product_name VARCHAR(20) NOT NULL UNIQUE,
	price INT NOT NULL
);

CREATE TABLE brand_category (
	brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
	category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,

	PRIMARY KEY(brand_id, category_id)
);

CREATE TABLE brand_product (
	brand_id INT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
	product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,

	PRIMARY KEY (brand_id, product_id)
);

CREATE TABLE reviews (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
	comment TEXT NOT NULL,
	star SMALLINT NOT NULL DEFAULT 0
);

-- 유저 초기화
INSERT INTO users (userName, pw, displayName) VALUES ('1234', '1234', '1234');
INSERT INTO users (userName, pw, displayName) VALUES ('123', '123', '123');
INSERT INTO users (userName, pw, displayName) VALUES ('12', '12', '12');
INSERT INTO users (userName, pw, displayName) VALUES ('1', '1', '1');
INSERT INTO users (userName, pw, displayName) VALUES ('0', '0', '0');
INSERT INTO users (userName, pw, displayName) VALUES ('qwer', 'qwer', 'qwer');

-- 카테고리 초기화
INSERT INTO categories (category_name, info, user_id) VALUES ('outer', '코트, 정장, 스웨터처럼 주로 야외나 옥외에서 다른 옷 위에 입는 옷의 총칭이다.', 1);
INSERT INTO categories (category_name, info, user_id) VALUES ('top', '상의', 2);
INSERT INTO categories (category_name, info, user_id) VALUES ('pants', '바지', 1);
INSERT INTO categories (category_name, info, user_id) VALUES ('Onepiece', '원피스', 2);
INSERT INTO categories (category_name, info, user_id) VALUES ('Skirt', '스커트', 1);
INSERT INTO categories (category_name, info, user_id) VALUES ('Sneakers', '스니커즈', 2);

-- 브랜드 초기화 및 브랜드, 카테고리 연결
INSERT INTO brands (brand_name, user_id) VALUES ('ADIDAS', 1);
INSERT INTO brand_category (brand_id, category_id) VALUES (1, 2);
INSERT INTO brand_category (brand_id, category_id) VALUES (1, 3);
INSERT INTO brand_category (brand_id, category_id) VALUES (1, 6);

INSERT INTO brands (brand_name, user_id) VALUES ('MAISON MARGIELA', 1);
INSERT INTO brand_category (brand_id, category_id) VALUES (2, 2);
INSERT INTO brand_category (brand_id, category_id) VALUES (2, 6);


INSERT INTO brands (brand_name, user_id) VALUES ('VIVA STUDIO', 2);
INSERT INTO brand_category (brand_id, category_id) VALUES (3, 2);

INSERT INTO brands (brand_name, user_id) VALUES ('COVERNOT', 1);
INSERT INTO brand_category (brand_id, category_id) VALUES (4, 1);
INSERT INTO brand_category (brand_id, category_id) VALUES (4, 2);

INSERT INTO brands (brand_name, user_id) VALUES ('HERMES', 2);
INSERT INTO brand_category (brand_id, category_id) VALUES (5, 1);

-- 상품 초기화 및 상품 브랜드 연결 (콜라보레이션 생각)
INSERT INTO products (user_id, category_id, product_name, price) VALUES (1, 1, '아우터1', 15000);
INSERT INTO brand_product (brand_id, product_id) VALUES (2, 1);

INSERT INTO products (user_id, category_id, product_name, price) VALUES (2, 2, '상의1', 30000);
INSERT INTO brand_product (brand_id, product_id) VALUES (3, 2);
INSERT INTO brand_product (brand_id, product_id) VALUES (4, 2);

INSERT INTO products (user_id, category_id, product_name, price) VALUES (2, 3, '바지1', 30000);
INSERT INTO brand_product (brand_id, product_id) VALUES (1, 3);

INSERT INTO products (user_id, category_id, product_name, price) VALUES (1, 4, '원피스1', 30000);
INSERT INTO brand_product (brand_id, product_id) VALUES (2, 4);
INSERT INTO brand_product (brand_id, product_id) VALUES (3, 4);

INSERT INTO products (user_id, category_id, product_name, price) VALUES (3, 5, '스니커즈1', 30000);
INSERT INTO brand_product (brand_id, product_id) VALUES (4, 5);

-- 리뷰 초기화
INSERT INTO reviews (user_id, product_id, comment, star) VALUES (2, 1, '리뷰1', 2);
INSERT INTO reviews (user_id, product_id, comment, star) VALUES (1, 2, '리뷰2', 3);
INSERT INTO reviews (user_id, product_id, comment, star) VALUES (3, 1, '리뷰3', 4);
INSERT INTO reviews (user_id, product_id, comment, star) VALUES (4, 3, '리뷰4', 1);
