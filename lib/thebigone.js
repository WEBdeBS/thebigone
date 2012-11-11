var express = require("express"),
	_ = require("underscore"),
    cons = require('consolidate'),
    swig = require('swig')
;

module.exports = function thebigone(config) {
	var app = express();

	app
		.use(express.bodyParser())
		.use(express.static(__dirname + "/../public"))
	;

	app.engine('.swig', cons.swig);
	app.set('view engine', 'swig');
	swig.init({
		root: __dirname + '/../views',
		allowErrors: true // allows errors to be thrown and caught by express instead of suppressed
	});
	app.set('views', __dirname + '/../views');

	app.get('/', function(req, res) {
		res.render('index');
	});

    app.get('/eu', function(req, res) {
        res.render('emergency_unit');
    });

	return app;
}
