const { brandDAO, categoryDAO, productDAO } = require('../../DAO')

const ProductDetailForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const productName = req.params.productName

		const brands = await productDAO.GetBrandsByName(productName)
		const detail = await productDAO.GetDetailProduct(productName)
		const comments = await productDAO.GetCommentsByName(productName)
		const avgStar = await productDAO.GetAverageStar(productName)
		const isStaff = user !== undefined && user.displayname === detail.displayname

		const obj = {
			name: productName,
			displayname: detail.displayname,
			brands: brands,
			category: detail.c_name,
			price: detail.price,
			star: avgStar.avg !== null ? parseFloat(avgStar.avg).toFixed(1) : '?',
			comments:comments,
		}

		res.render('./product/detail.pug', { user, obj, isStaff })
	} catch(e){
		next(e)
	}
}

const ProductPostForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const brandList = await brandDAO.GetBrandList();
		const categoryList = await categoryDAO.GetCategoryList();

		res.render('./product/post.pug', { user, brandList, categoryList })
	} catch(e){
		next(e);
	}
}

const ProductPost = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { name, category, brand, price } = req.body;
		const category_id = await categoryDAO.GetByName(category)

		await productDAO.InsertProduct(user.displayname, category_id.id, name, parseInt(price))
		if(Array.isArray(brand)){
			for(let i = 0; i < brand.length; ++i) {
				await productDAO.LinkBrandProduct(brand[i], name)
			}
		}
		else await productDAO.LinkBrandProduct(brand, name)
		
		res.redirect(`/products/product/${name}`)
	} catch(e){
		next(e)
	}

}

const addBrand = async (req, res, next) => {
	try {
		const brands = await productDAO.GetBrandList();

		let json = {}
		let html = ""
		html += "<select class='mt-4 form-select brands' title='brand' name='brand'>\n"
		html += "	<option value='' selected>Brand</option>\n"

		for(let i = 0; i < brands.length; ++i){
			let name = brands[i].brand_name
			html += `	<option value='${name}'> ${name}</option>\n`
		}

		html += "</select>\n"

		json.html = html

		res.json(json)
	} catch(e){
		next(e)
	}
}

const addComments = async (req, res, next) => {
	try {
		const { user } = req.session;
		const { name, comment, rating } = req.body;

		await productDAO.addComment(user.displayname, name, comment, parseInt(rating));

		res.redirect(`/products/product/${name}`)
	} catch(e){
		next(e);
	}
}

const ProductEditForm = async (req, res, next) => {
	try {
		const user = req.session.user
		const p_name = req.params.p_name

		const category = await productDAO.GetDetailProduct(p_name)
		const brands = await productDAO.GetBrandsByName(p_name)
		
		res.render('./product/edit.pug', { user, category, brands })
	} catch (e) {
		next(e);
	}
}

const ProductEdit = async (req, res, next) => {
	try {
		const p_name = req.params.p_name;
		const { name, price } = req.body;

		await productDAO.EditProduct(p_name, name, price)
		res.redirect(`/products/product/${name}`)
	} catch (e) {
		next(e);
	}
}

module.exports = {
	ProductDetailForm,
	ProductPostForm,
	ProductPost,
	addBrand,
	addComments,
	ProductEditForm,
	ProductEdit,
}