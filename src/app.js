const express = require('express')
const session = require('express-session')
const controller = require('./controller')
const app = express();

app.set('views', `${__dirname}/../views`);
app.set('view engine', 'pug');

app.use('/', express.static(`${__dirname}/../public`));
app.use(express.urlencoded({ extended: true}));

app.use(session({
	secret: '!@#$%^&*()',
	resave: false,
	saveUninitialized: true,
}))

app.use('/', controller);

module.exports = app;