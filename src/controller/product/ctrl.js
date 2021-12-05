const { brandDAO, categoryDAO, productDAO, reviewDAO } = require('../../DAO')

const ProductDetailForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const productName = req.params.productName

		const brands = await productDAO.GetBrandsByName(productName)
		const detail = await productDAO.GetDetailProduct(productName)
		const comments = await productDAO.GetCommentsByName(productName)
		const avgStar = await productDAO.GetAverageStar(productName)

		const obj = {
			name: productName,
			displayname: detail.displayname,
			brands: brands,
			category: detail.c_name,
			price: detail.price,
			star: avgStar.avg !== null ? parseFloat(avgStar.avg).toFixed(1) : '?',
			comments:comments,
		}

		res.render('./product/detail.pug', { user, obj })
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
		let html = "<select class='mt-4 form-select' title='brand' name='brand'>\n	<option value='' selected>Brand</option>\n"

		for(let i = 0; i < brands.length; ++i){
			let name = brands[i].brand_name
			html += `	<option value='${name}'> ${name}</option>\n`
		}

		html += "</select>"

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

		console.log(name, comment, rating);
		await reviewDAO.addComment(user.displayname, name, comment, parseInt(rating));

		res.redirect(`/products/product/${name}`)
	} catch(e){
		next(e);
	}
}

module.exports = {
	ProductDetailForm,
	ProductPostForm,
	ProductPost,
	addBrand,
	addComments,
}