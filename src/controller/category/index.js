const { Router } = require('express')
const ctrl = require('./ctrl')
const { authRequired } = require('../auth/middleware')
const router = Router()

router.get('/', ctrl.CategoryForm)
router.get('/post', authRequired, ctrl.CategoryPostForm)
router.get('/category/:categoryName', ctrl.CategoryInfo)
router.get('/edit/:categoryName', authRequired, ctrl.CategoryEditForm)
router.get('/delete/:categoryName', authRequired, ctrl.CategoryDelete)

router.post('/post', authRequired, ctrl.CategoryPost)
router.post('/edit/:categoryName', authRequired, ctrl.CategoryEdit)

module.exports = router;