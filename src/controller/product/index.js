const { Router } = require('express')
const { authRequired } = require('../auth/middleware')
const ctrl = require('./ctrl')
const router = Router()

router.get('/post', authRequired, ctrl.ProductPostForm)
router.get('/product/:productName', ctrl.ProductDetailForm)
router.get('/edit/:p_name', authRequired, ctrl.ProductEditForm);

router.post('/post', authRequired, ctrl.ProductPost)
router.post('/addBrand', authRequired, ctrl.addBrand)
router.post('/addComments', authRequired, ctrl.addComments)
router.post('/edit/:p_name', authRequired, ctrl.ProductEdit);

module.exports = router;