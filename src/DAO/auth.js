const { runQuery } = require('../lib/database');

// 유저의 ID(userName)와 비밀번호, 닉네임(displayName)을 받아 데이터베이스에 INSERT하는 함수. 
const CreateUser = async (userName, password, displayName) => {
	const sql = "INSERT INTO users (userName, pw, displayName) VALUES ($1, $2, $3);";
	const values = [userName, password, displayName];

	await runQuery(sql, values);
}

// 유저의 ID를 받아 비밀번호를 찾아오는 함수.
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