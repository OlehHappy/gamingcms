module.exports = function(app, mongoose, models) {

	var responder = require('./responder');
	var CRUD = require('./CRUD')(app, mongoose, models, responder());

	var paths = {};
		paths.commentPaths = require('./paths/comment')(app, mongoose, models, responder(), CRUD());
		paths.sitePaths = require('./paths/site')(app, mongoose, models, responder(), CRUD());
		paths.imagePaths = require('./paths/image')(app, mongoose, models, responder(), CRUD());
		paths.themePaths = require('./paths/theme')(app, mongoose, models, responder(), CRUD());
		paths.userPaths = require('./paths/user')(app, mongoose, models, responder(), CRUD());
		paths.rolePaths = require('./paths/role')(app, mongoose, models, responder(), CRUD());
		paths.menuPaths = require('./paths/menu')(app, mongoose, models, responder(), CRUD());
		paths.pagePaths = require('./paths/page')(app, mongoose, models, responder(), CRUD());


	app.get('/login', function(req, res) {
		res.render('cms/templates/front-end/mb-login');
	});

	app.get('/cms', function(req, res) {
		res.render('cms/templates/backend/index');
	});

	app.get('/cms/templates/backend/:template', function (req, res) {
		res.render('cms/templates/backend/' + req.params.template);
	});

	app.get('/cms/:url', function(req, res) {
		res.render('cms/templates/backend/index');
	});

	app.get('/themes/:theme/templates/:template', function(req, res) {
		res.render('themes/' + req.params.theme + '/templates/' + req.params.template);
	});

	app.get('*', function(req, res) {
		res.render('themes/' + THEME + '/index', {serverData: {theme: THEME, templates: TEMPLATES}});
	});
};
