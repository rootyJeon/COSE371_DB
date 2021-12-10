const { runQuery } = require('../lib/database')

// 모든 카테고리의 식별 번호와 이름을 이름 순으로 정렬하여 가져오는 함수.
const GetCategoryList = async () => {
	const sql = "SELECT id, category_name FROM categories ORDER BY category_name;"
	const list = await runQuery(sql);

	return list;
}

// 카테고리의 이름을 입력받아 해당 카테고리에 포함된 상품의 이름과 해당 상품을 게시한 사람의 닉네임을 가져오는 함수.
const GetProducts = async (categoryName) => {
	const sql =
	"SELECT u.displayName displayname, p.product_name p_name \
	FROM users u, (products p JOIN categories c ON p.category_id = c.id) \
	WHERE p.user_id = u.id AND c.id = (SELECT id FROM categories WHERE category_name = $1);"
	const values = [categoryName]

	const list = await runQuery(sql, values)

	return list
}

// 카테고리의 이름, 정보, 게시한 사람의 닉네임을 받아 categories테이블에 삽입하는 함수.
const CreateCategory = async (categoryName, info, userName) => {
	const sql = "INSERT INTO categories(category_name, info, user_id) VALUES ($1, $2, (SELECT id FROM users WHERE userName = $3));"
	const values = [categoryName, info, userName]

	await runQuery(sql, values)
}

// 카테고리의 이름을 수정하는 함수.
const UpdateCategory = async (originalName, newName) => {
	const sql = "UPDATE categories SET category_name = $2 WHERE category_name = $1;"
	const values = [originalName, newName]

	await runQuery(sql, values)
}

// 카테고리를 삭제하는 함수.
const DeleteCategory = async (categoryName) => {
	const sql = "DELETE FROM categories WHERE category_name = $1;"
	const values = [categoryName]

	await runQuery(sql, values)
}

module.exports = {
	GetCategoryList,
	GetProducts,
	CreateCategory,
	UpdateCategory,
	DeleteCategory,
}