// Paths and Options
var express = require('express'),
	stylus = require('stylus'),
	jade = require('jade'),
	prerender = require('prerender-node'),
	bodyParser = require('body-parser'),
	multer  = require('multer'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport');

module.exports = function(app) {
	var clientPath = './client/';
	function compile(str, path) {
		return stylus(str).set('filename', path);
	}
	app.set('views', clientPath);
	app.use(express.static(clientPath));
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(multer({ 
		dest: './client/images/', 
		rename: function (fieldname, filename) {
  			return filename + '-' + Date.now()
		}
	}));
	app.use(prerender);
	app.use(session({secret: 'Yellow or*&ange bRown_189'}));
	app.use(passport.initialize());
	app.use(passport.session());
	// app.use(stylus.middleware({
	// 	src: viewsPath,
	// 	compile: compile
	// }));
};