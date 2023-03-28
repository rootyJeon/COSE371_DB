const authRequired = async (req, res, next) => {
	try {
		if(req.session.user) next();

		else res.redirect('/auth/sign-in');
	} catch(e){
		next(e);
	}
}

module.exports = {
	authRequired,
}