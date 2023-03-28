const { Router } = require('express');
const router = Router();

const ctrl = require('./ctrl');

router.get('/sign-up', ctrl.SignUpForm);
router.get('/sign-in', ctrl.SignInForm);
router.get('/sign-out', ctrl.SignOut);

router.post('/sign-up', ctrl.SignUp);
router.post('/sign-in', ctrl.SignIn);

module.exports = router;