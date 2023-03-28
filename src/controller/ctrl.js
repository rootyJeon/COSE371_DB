const { productDAO } = require('../DAO')

const indexPage = async(req, res, next) => {
    try {
        const user = req.session.user;
        const objs = await productDAO.GetAllProducts();

        res.render('./index.pug', { user, objs, total: objs.length});
    } catch(e){
        next(e);
    }
}

module.exports = {
    indexPage,
}