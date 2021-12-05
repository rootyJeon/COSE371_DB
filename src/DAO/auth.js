const { runQuery } = require('../lib/database');

const CreateUser = async (userName, password, displayName) => {
	const sql = "INSERT INTO users (userName, pw, displayName) VALUES ($1, $2, $3);";
	const values = [userName, password, displayName];

	await runQuery(sql, values);
}

const GetPWByName = async (userName) => {
	const sql = "SELECT pw FROM users WHERE userName = $1;"
	const values = [userName]

	const [id] = await runQuery(sql, values)

	return id
}

module.exports = {
	CreateUser,
	GetPWByName,
}