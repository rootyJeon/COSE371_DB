const { Router } = require('express');
const { authRequired } = require('../auth/middleware');
const ctrl = require('./ctrl');

const router = Router();

router.get('/', ctrl.BrandPage);
router.get('/brand/:brandName', ctrl.BrandInfo)
router.get('/post', authRequired, ctrl.BrandPostForm)
router.get('/edit/:brandName', authRequired, ctrl.BrandEditForm)
router.get('/delete/:brandName', authRequired, ctrl.BrandDelete)

router.post('/post', authRequired, ctrl.BrandPost)
router.post('/edit/:brandName', authRequired, ctrl.BrandEdit)
router.post('/addCategory', authRequired, ctrl.addCategory)

module.exports = router;