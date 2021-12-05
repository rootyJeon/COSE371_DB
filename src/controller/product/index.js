const { Router } = require('express')
const { authRequired } = require('../auth/middleware')
const ctrl = require('./ctrl')
const router = Router()

router.get('/product/:productName', ctrl.ProductDetailForm)
router.get('/post', authRequired, ctrl.ProductPostForm)

router.post('/post', authRequired, ctrl.ProductPost)
router.post('/addBrand', authRequired, ctrl.addBrand)
router.post('/addComments', authRequired, ctrl.addComments)

module.exports = router;