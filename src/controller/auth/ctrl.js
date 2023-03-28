const { authDAO } = require('../../DAO');

// 회원가입 페이지 GET
const SignUpForm = async (req, res, next) => {
	try {
		res.render('./auth/sign-up.pug');
	} catch(e) {
		next(e);
	}
}

// 로그인 페이지 GET
const SignInForm = async (req, res, next) => {
	try {
		res.render('./auth/sign-in.pug');
	} catch(e){
		next(e);
	}
}

// 회원가입 POST
// ID 중복 및 password check는 AJAX로 처리할 예정..? 안되면 여기서 처리하지 뭐
const SignUp = async (req, res, next) => {
	const { userName, password, displayName } = req.body;

	try {
		await authDAO.CreateUser(userName, password, displayName);
		res.redirect('/');
	} catch(e){
		next(e);
	}
}

// 로그인 POST
// 일단은 DB로 구현하고, 된다면 AJAX로 하고싶긴 하네
const SignIn = async (req, res, next) => {
	const { userName, password } = req.body;

	try {
		const get_pw = await authDAO.GetPWByName(userName)

		if(get_pw['pw'] === password){
			req.session.user = {
				displayname: userName,
			}
	
			res.redirect('/');
		}
	} catch (e){
		next(e);
	}
}

const SignOut = async (req, res, next) => {
	try {
		req.session.destroy();
		res.redirect('/');
	} catch(e){
		next(e);
	}
}

module.exports = {
	SignInForm,
	SignUpForm,
	SignUp,
	SignIn,
	SignOut,
}