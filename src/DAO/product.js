const { runQuery } = require('../lib/database')

// 모든 상품의 이름, 카테고리, 가격, 게시한 사람의 닉네임을 가져오는 함수.
const GetAllProducts = async () => {
	const sql = "SELECT displayName, category_name, product_name, price FROM products p, categories c, users u " + 
				"WHERE p.user_id = u.id AND p.category_id = c.id;"
	const list = await runQuery(sql)

	return list
}

// 모든 브랜드의 식별 번호와 이름을 가져오는 함수.
const GetBrandList = async () => {
	const sql = "SELECT id, brand_name FROM brands ORDER BY brand_name;"

	const list = await runQuery(sql);

	return list;
}

// 상품의 이름을 받아 해당 상품이 가지는 브랜드들의 목록을 가져오는 함수.
const GetBrandsByName = async (productName) => {
	const sql = "SELECT brand_name FROM brands b JOIN brand_product bp ON b.id = bp.brand_id WHERE product_id = (SELECT id FROM products WHERE product_name = $1);"
	const values = [productName]

	const list = await runQuery(sql, values)

	return list
}

// 상품의 이름을 받아 해당 상품에 달린 댓글의 내용, 별점, 댓글을 남긴 사람의 닉네임을 가져오는 함수.
const GetCommentsByName = async (productName) => {
	const sql = "SELECT u.displayName displayname, r.comment comment, r.star star \
				 FROM users u JOIN reviews r ON u.id = r.user_id \
				 WHERE r.product_id = (SELECT id FROM products WHERE product_name = $1) ORDER BY r.id;"
	const values = [productName]

	const list = await runQuery(sql, values)

	return list
}

// 해당 상품의 이름을 받아 상세 정보(게시한 사람의 닉네임, 카테고리, 가격)을 가져오는 함수.
const GetDetailProduct = async (productName) => {
	const sql = "SELECT u.displayName displayname, c.category_name c_name, p.price price \
				 FROM users u, (products p JOIN categories c ON p.category_id = c.id) \
				 WHERE p.id = (SELECT id FROM products WHERE product_name = $1);"
	const values = [productName]

	const [detail] = await runQuery(sql, values)

	return detail
}

// 상품의 별점들을 총합하여 평균을 가져오는 함수.
const GetAverageStar = async (productName) => {
	const sql = 
	"SELECT AVG(star) \
	FROM products p, reviews r \
	WHERE r.product_id = p.id AND p.product_name = $1;"
	const values = [productName]

	const [avg] = await runQuery(sql, values);

	return avg;
}

// 상품을 게시한 사람의 닉네임, 상품의 이름, 카테고리, 가격을 입력받아 categories 테이블에 INSERT하는 함수.
const InsertProduct = async (userName, categoryId, productName, price) => {
	const sql = "INSERT INTO products(user_id, category_id, product_name, price) VALUES ((SELECT id FROM users WHERE userName = $1), $2, $3, $4);"
	const values = [userName, categoryId, productName, price]

	await runQuery(sql, values)
}

// 브랜드 명과 상품명을 받아 brand_product 테이블에 INSERT하는 함수.
const LinkBrandProduct = async (brandName, productName) => {
	const subquery1 = "(SELECT id FROM brands WHERE brand_name = $1)"
	const subquery2 = "(SELECT id FROM products WHERE product_name = $2)"
	const sql = `INSERT INTO brand_product (brand_id, product_id) VALUES (${subquery1}, ${subquery2});`
	const values = [brandName, productName]

	await runQuery(sql, values)
}

// 상품의 이름 및 가격을 수정하는 함수.
const EditProduct = async (og_name, p_name, price) => {
	const sql = "UPDATE products SET product_name = $1, price = $2 WHERE product_name = $3;"
	const values = [p_name, price, og_name]

	await runQuery(sql, values)
}

// 유저의 닉네임, 상품의 이름, 댓글 내용, 평점을 입력받아 revies테이블에 ISNERT하는 함수.
const addComment = async (u_d_name, p_name, comment, rating) => {
	const u_id_subQuery = "(SELECT id FROM users WHERE displayName = $1)"
	const p_id_subQuery = "(SELECT id FROM products WHERE product_name = $2)"
	const sql = 
	`INSERT INTO reviews (user_id, product_id, comment, star) \
	VALUES (${u_id_subQuery}, ${p_id_subQuery}, $3, $4);`
	console.log(p_name);
	const values = [u_d_name, p_name, comment, rating]

	await runQuery(sql, values);
}

module.exports = {
	GetAllProducts,
	GetBrandList,
	GetDetailProduct,
	GetCommentsByName,
	GetBrandsByName,
	GetAverageStar,
	InsertProduct,
	LinkBrandProduct,
	EditProduct,
	addComment,
}