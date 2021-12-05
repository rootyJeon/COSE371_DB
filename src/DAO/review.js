const { runQuery } = require('../lib/database')

const GetCommentByProductId = async (productId) => {
	const sql = "SELECT displayName, comment, star FROM users u JOIN reviews r ON r.user_id = u.id WHERE product_id = $1;"
	const values = [productId]

	const list = runQuery(sql, values)
	return list
}

const GetAvgOfStar = async (productId) => {
	const sql = "SELECT Avg(star) AS avg FROM reviews WHERE product_id = $1;"
	const values = [productId]

	const avg = runQuery(sql, values)
	return avg
}

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
	GetCommentByProductId,
	GetAvgOfStar,
	addComment,
}