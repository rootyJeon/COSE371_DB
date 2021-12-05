const { brandDAO } = require('../../DAO');

const BrandPage = async (req, res, next) => {
	try {
		const user = req.session.user;

		const brand_list = await brandDAO.GetBrandList();

		res.render('./brand/index.pug', { user, brand_list });
	} catch(e){
		next(e);
	}
}

const BrandInfo = async (req, res, next) => {
	try {
		const user = req.session.user;
		const brandName = req.params.brandName;
		const brandUser = await brandDAO.GetByName(brandName);
		const isStaff = user !== undefined && user.displayname === brandUser.displayname

		const pIds = await brandDAO.GetProductsId(brandName)
		let objs = []

		for (let pId in pIds) {
			const obj = await brandDAO.GetProductInfo(pIds[pId]['product_id'])
			objs.push(obj)
		}

		res.render('./brand/detail.pug', {user, brandName, objs, isStaff})
	} catch(e){
		next(e);
	}
}

const BrandPostForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const categoryList = await brandDAO.GetCategoryList()

		res.render('./brand/post.pug', { user, categoryList });
	} catch(e){
		next(e);
	}
}

const BrandPost = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { name, category } = req.body;
	
		await brandDAO.PostBrand(name, user.displayname);
		if(Array.isArray(category)){
			for (let i = 0; i < category.length; ++i){
				await brandDAO.PostBrandCategory(name, category[i]);
			}
		}
		else await brandDAO.PostBrandCategory(name, category);

		res.redirect('/brands');
	} catch (e) {
		next(e);
	}
}

const BrandEditForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const brandName = req.params.brandName
		const categoryList = await brandDAO.GetCategoryList()
		const categories = await brandDAO.GetCategories(brandName);
		
		console.log(categories);
		res.render('./brand/post.pug', { user, brandName, categories, categoryList })
	} catch(e){
		next(e)
	}
}

const BrandEdit = async (req, res, next) => {
	try {
		const brandName = req.params.brandName
		const newName = req.body.name;

		await brandDAO.UpdateBrand(brandName, newName)
		
		res.redirect(`/brands/brand/${newName}`)
	} catch(e){
		next(e)
	}
}

const BrandDelete = async (req, res, next) => {
	try {
		const brandName = req.params.brandName
		await brandDAO.DeleteBrand(brandName)

		res.redirect('/brands')
	} catch (e){
		next(e);
	}
}

const addCategory = async (req, res, next) => {
	try {
		const categoryList = await brandDAO.GetCategoryList()

		let html = "<select class='mt-4 form-select' name='category'>\n		<option value='' selected>Category</option>\n"
		for(let i = 0; i < categoryList.length; ++i){
			let name = categoryList[i].c_name
			html += `	<option value='${name}'> ${name}</option>\n`
		}
		html += "</select>"
		console.log(html)

		let json = {}
		json.html = html

		res.json(json)
	} catch (e){
		next(e)
	}
}

module.exports = {
	BrandPage,
	BrandInfo,
	BrandPostForm,
	BrandPost,
	BrandEditForm,
	BrandEdit,
	BrandDelete,
	addCategory,
}