const { runQuery } = require('../lib/database')

// 데이터베이스에 존재하는 모든 브랜드의 식별 번호와 상호명을 가져오는 함수 
const GetBrandList = async () => {
	const sql = "SELECT id, brand_name FROM brands ORDER BY brand_name;"

	const list = await runQuery(sql);

	return list;
}

// 데이터베이스에 존재하는 모든 카테고리의 이름을 가져오는 함수.
const GetCategoryList = async () => {
	const sql = "SELECT category_name c_name FROM categories;"
	const list = await runQuery(sql)

	return list
}

// 브랜드의 이름을 입력받아 해당 브랜드가 가지고 있는 카테고리를 가져오는 함수.
// 1. 브랜드의 이름을 통해 brands 테이블에서 식별 번호를 가져옴.
// 2. brand_category 테이블에서 1에서 가져온 식별 번호를 통헤 해당 브랜드가 가지고 있는 카테고리의 식별 번호를 가져옴.
// 3. category 테이블에서 2에서 가져온 식별 번호를 통해 카테고리 이름을 가져옴.
const GetCategories = async (b_name) => {
	const sql = 
	"SELECT category_name c_name FROM brands b, (categories c JOIN brand_category bc ON c.id = bc.category_id) \
	 WHERE b.id = bc.brand_id AND b.id = (SELECT id FROM brands WHERE brand_name = $1);"
	const values = [b_name]
	const list = await runQuery(sql, values)

	return list
}

// 브랜드의 이름을 입력받아 해당 브랜드를 만든 사람의 닉네임을 가져오는 함수.
const GetByName = async (brandName) => {
	const sql = "SELECT displayName displayname FROM users JOIN brands ON users.id = brands.user_id WHERE brand_name = $1;"
	const values = [brandName]

	const [id] = await runQuery(sql, values)

	return id
}

// 브랜드의 이름을 입력받아 해당 브랜드가 가지고 있는 상품들의 식별 번호를 가져오는 함수.
const GetProductsId = async (brandName) => {
	const sql = "SELECT product_id FROM brand_product WHERE brand_id = " +
					"(SELECT id FROM brands WHERE brand_name = $1);"
	const values = [brandName]
	const list = await runQuery(sql, values)

	return list
				
}

// 상품의 식별 번호를 입력받아 해당 상품의 이름, 카테고리, 해당 상품을 게시한 사람의 닉네임을 가져오는 함수.
const GetProductInfo = async (productId) => {
	const sql = "SELECT p.product_name p_name, c.category_name c_name, u.displayName displayName FROM products p, categories c, users u " + 
					"WHERE p.category_id = c.id AND p.user_id = u.id AND p.id = $1;"
	const values = [productId]

	const [list] = await runQuery(sql, values)

	return list;
}

// 브랜드의 이름을 입력받아 brands 테이블에 INSERT하는 함수. 함께 브랜드를 만든 사람의 식별 번호도 저장.
const PostBrand = async (Name, userName) => {
	const sql = "INSERT INTO brands (brand_name, user_id) VALUES ($1, (SELECT id FROM users WHERE userName = $2));"
	const values = [Name, userName];

	await runQuery(sql, values);
}

// 브랜드의 이름과 카테고리를 입력받아 brand_category 테이블에 INSERT하는 함수.
const PostBrandCategory = async (b_name, c_name) => {
	const b_subQuery = `SELECT id FROM brands WHERE brand_name = $1`
	const c_subQuery = `SELECT id FROM categories WHERE category_name = $2`
	const sql =
	`INSERT INTO brand_category (brand_id, category_id) \
	 VALUES ((${b_subQuery}), (${c_subQuery}));`
	 const values = [b_name, c_name]

	 await runQuery(sql, values)
}

// brand의 이름을 수정하는 함수.
const UpdateBrand = async (og_name, new_name) => {
	const sql = "UPDATE brands SET brand_name = $1 WHERE brand_name = $2;"
	const values = [new_name, og_name]

	await runQuery(sql, values)
}

// brand를 삭제하는 함수.
const DeleteBrand = async (brandName) => {
	const sql = "DELETE FROM brands WHERE brand_name = $1;"
	const values = [brandName]

	await runQuery(sql, values)
}

// brand를 삭제할 때, brand와 상품을 직접적으로 연결시키지 않았기 때문에, DELETE CASCADE로 상품 자동삭제 불가능.
// 상품 자동 삭제를 위해 브랜드의 이름을 입력받으면 해당 브랜드가 가지고 있는 모든 상품을 삭제하는 함수.
const DeleteProducts = async (brandName) => {
	const subQuery1 = "SELECT id FROM brands WHERE brand_name = $1";
	const subQuery2 = `SELECT product_id FROM brand_product WHERE brand_id = (${subQuery1})`;

	const sql = 
	`DELETE FROM products \
	 WHERE id = (${subQuery2})`
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
	DeleteProducts,
}