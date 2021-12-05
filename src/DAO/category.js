const { runQuery } = require('../lib/database')

const GetCategoryList = async () => {
	const sql = "SELECT id, category_name FROM categories ORDER BY category_name;"
	const list = await runQuery(sql);

	return list;
}

const GetByName = async (categoryName) => {
	const sql = "SELECT * FROM categories WHERE category_name = $1;"
	const values = [categoryName]

	const [id] = await runQuery(sql, values)

	return id
}

const GetProducts = async (categoryName) => {
	const sql =
	"SELECT u.displayName displayname, p.product_name p_name \
	FROM users u, (products p JOIN categories c ON p.category_id = c.id) \
	WHERE p.user_id = u.id AND c.id = (SELECT id FROM categories WHERE category_name = $1);"
	const values = [categoryName]

	const list = await runQuery(sql, values)

	return list
}

const CreateCategory = async (categoryName, info, userName) => {
	const sql = "INSERT INTO categories(category_name, info, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE userName = $3));"
	const values = [categoryName, info, userName]

	await runQuery(sql, values)
}

const UpdateCategory = async (originalName, newName) => {
	const sql = "UPDATE categories SET category_name = $2 WHERE category_name = $1;"
	const values = [originalName, newName]

	await runQuery(sql, values)
}

const DeleteCategory = async (categoryName) => {
	const sql = "DELETE FROM categories WHERE category_name = $1;"
	const values = [categoryName]

	await runQuery(sql, values)
}

module.exports = {
	GetCategoryList,
	GetByName,
	GetProducts,
	CreateCategory,
	UpdateCategory,
	DeleteCategory,
}