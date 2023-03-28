const { Router } = require('express');
const router = Router();

const ctrl = require('./ctrl');
const auth = require('./auth');
const brand = require('./brand');
const category = require('./category');
const product = require('./product');

router.get('/', ctrl.indexPage);
router.use('/auth', auth);
router.use('/brands', brand);
router.use('/categories', category);
router.use('/products', product);

module.exports = router;