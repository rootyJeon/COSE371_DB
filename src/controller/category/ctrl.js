const { categoryDAO } = require('../../DAO')

const CategoryForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const category_list = await categoryDAO.GetCategoryList();

		res.render('./category/index.pug', { user, category_list })
	} catch(e){
		next(e);
	}
}

const CategoryInfo = async (req, res, next) => {
	try {
		const { user } = req.session;
		const { categoryName } = req.params;
		const objs = await categoryDAO.GetProducts(categoryName);
		const isStaff = user === undefined || user.displayname !== objs.displayname ? false : true
		console.log(objs)
		res.render('./category/detail.pug', { user , objs, isStaff, c_name: categoryName})
	} catch(e){
		next(e);
	}
}

const CategoryPostForm = async (req, res, next) => {
	try {
		const user = req.session.user;

		res.render('./category/post.pug', { user })
	} catch(e){
		next(e);
	}
}

const CategoryPost = async (req, res, next) => {
	try {
		const user = req.session.user;
		const { name, info } = req.body;

		await categoryDAO.CreateCategory(name, info, user.displayname);

		res.redirect('/categories')
	} catch(e){
		next(e);
	}
}

const CategoryEditForm = async (req, res, next) => {
	try {
		const user = req.session.user;
		const categoryName = req.params.categoryName;

		res.render('./category/post.pug', { user, categoryName })
	} catch (e) {
		next(e)
	}
}

const CategoryEdit = async (req, res, next) => {
	try {
		const originalName = req.params.categoryName;
		const newName = req.body.name;

		await categoryDAO.UpdateCategory(originalName, newName)

		res.redirect(`/categories/category/${newName}`)
	} catch(e){
		next(e)
	}
}

const CategoryDelete = async (req, res, next) => {
	try {
		const categoryName = req.params.categoryName
		await categoryDAO.DeleteCategory(categoryName)

		res.redirect('/categories')
	} catch(e){
		next(e);
	}
}

module.exports = {
	CategoryForm,
	CategoryInfo,
	CategoryPostForm,
	CategoryPost,
	CategoryEditForm,
	CategoryEdit,
	CategoryDelete,
}