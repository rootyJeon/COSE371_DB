const { runQuery } = require('../lib/database')

const GetAllProducts = async () => {
	const sql = "SELECT displayName, category_name, product_name, price FROM products p, categories c, users u " + 
				"WHERE p.user_id = u.id AND p.category_id = c.id;"
	const list = await runQuery(sql)

	return list
}

const GetBrandList = async () => {
	const sql = "SELECT id, brand_name FROM brands ORDER BY brand_name;"

	const list = await runQuery(sql);

	return list;
}

const GetBrandsByName = async (productName) => {
	const sql = "SELECT brand_name FROM brands b JOIN brand_product bp ON b.id = bp.brand_id WHERE product_id = (SELECT id FROM products WHERE product_name = $1);"
	const values = [productName]

	const list = await runQuery(sql, values)

	return list
}

const GetCommentsByName = async (productName) => {
	const sql = "SELECT u.displayName displayname, r.comment comment, r.star star \
				 FROM users u JOIN reviews r ON u.id = r.user_id \
				 WHERE r.product_id = (SELECT id FROM products WHERE product_name = $1) ORDER BY r.id;"
	const values = [productName]

	const list = await runQuery(sql, values)

	return list
}

const GetDetailProduct = async (productName) => {
	const sql = "SELECT u.displayName displayname, c.category_name c_name, p.price price \
				 FROM users u, (products p JOIN categories c ON p.category_id = c.id) \
				 WHERE p.id = (SELECT id FROM products WHERE product_name = $1);"
	const values = [productName]

	const [detail] = await runQuery(sql, values)

	return detail
}

const GetAverageStar = async (productName) => {
	const sql = 
	"SELECT AVG(star) \
	FROM products p, reviews r \
	WHERE r.product_id = p.id AND p.product_name = $1;"
	const values = [productName]

	const [avg] = await runQuery(sql, values);

	return avg;
}

const InsertProduct = async (userName, categoryId, productName, price) => {
	const sql = "INSERT INTO products(user_id, category_id, product_name, price) VALUES ((SELECT id FROM users WHERE userName = $1), $2, $3, $4);"
	const values = [userName, categoryId, productName, price]

	await runQuery(sql, values)
}

const LinkBrandProduct = async (brandName, productName) => {
	const subquery1 = "(SELECT id FROM brands WHERE brand_name = $1)"
	const subquery2 = "(SELECT id FROM products WHERE product_name = $2)"
	const sql = `INSERT INTO brand_product (brand_id, product_id) VALUES (${subquery1}, ${subquery2});`
	const values = [brandName, productName]

	await runQuery(sql, values)
}

const EditProduct = async (og_name, p_name, price) => {
	const sql = "UPDATE products SET product_name = $1, price = $2 WHERE product_name = $3;"
	const values = [p_name, price, og_name]

	await runQuery(sql, values)
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
}