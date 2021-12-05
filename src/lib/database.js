const { Client } = require('pg');

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = {
	host: DB_HOST || 'localhost',
	port: DB_PORT || 5432,
	user: DB_USER,
	password: DB_PASS,
	database: DB_NAME
}

const runQuery = async (pstmt, data) => {
	const client = new Client(connection);

	await client.connect();

	try {
		const res = await client.query(pstmt, data);

		return res.rows;
	} finally {
		await client.end();
	}
}

module.exports = {
	runQuery,
};