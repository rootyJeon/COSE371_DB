const { runQuery } = require('../lib/database')

const GetBrandList = async () => {
	const sql = "SELECT id, brand_name FROM brands ORDER BY brand_name;"

	const list = await runQuery(sql);

	return list;
}

const GetCategoryList = async () => {
	const sql = "SELECT category_name c_name FROM categories;"
	const list = await runQuery(sql)

	return list
}

const GetCategories = async (b_name) => {
	const sql = 
	"SELECT category_name c_name FROM brands b, (categories c JOIN brand_category bc ON c.id = bc.category_id) \
	 WHERE b.id = bc.brand_id AND b.id = (SELECT id FROM brands WHERE brand_name = $1);"
	const values = [b_name]
	const list = await runQuery(sql, values)

	return list
}

const GetByName = async (brandName) => {
	const sql = "SELECT displayName displayname FROM users JOIN brands ON users.id = brands.user_id WHERE brand_name = $1;"
	const values = [brandName]

	const [id] = await runQuery(sql, values)

	return id
}

const GetProductsId = async (brandName) => {
	const sql = "SELECT product_id FROM brand_product WHERE brand_id = " +
					"(SELECT id FROM brands WHERE brand_name = $1);"
	const values = [brandName]
	const list = await runQuery(sql, values)

	return list
				
}

const GetProductInfo = async (productId) => {
	const sql = "SELECT p.product_name p_name, c.category_name c_name, u.displayName displayName FROM products p, categories c, users u " + 
					"WHERE p.category_id = c.id AND p.user_id = u.id AND p.id = $1;"
	const values = [productId]

	const [list] = await runQuery(sql, values)

	return list;
}

const PostBrand = async (Name, userName) => {
	const sql = "INSERT INTO brands (brand_name, user_id) VALUES ($1, (SELECT id FROM users WHERE userName = $2));"
	const values = [Name, userName];

	await runQuery(sql, values);
}

const PostBrandCategory = async (b_name, c_name) => {
	const b_subQuery = `SELECT id FROM brands WHERE brand_name = $1`
	const c_subQuery = `SELECT id FROM categories WHERE category_name = $2`
	const sql =
	`INSERT INTO brand_category (brand_id, category_id) \
	 VALUES ((${b_subQuery}), (${c_subQuery}));`
	 const values = [b_name, c_name]

	 await runQuery(sql, values)
}

const UpdateBrand = async (og_name, new_name) => {
	const sql = "UPDATE brands SET brand_name = $1 WHERE brand_name = $2;"
	const values = [new_name, og_name]

	await runQuery(sql, values)
}

const DeleteBrand = async (brandName) => {
	const sql = "DELETE FROM brands WHERE brand_name = $1;"
	const values = [brandName]

	await runQuery(sql, values)
}

module.exports = {
	GetBrandList,
	GetCategoryList,
	GetByName,
	GetCategories,
	GetProductsId,
	GetProductInfo,
	PostBrand,
	PostBrandCategory,
	UpdateBrand,
	DeleteBrand,
}