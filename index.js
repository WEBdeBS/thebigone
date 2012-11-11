var config = require('config');
var http  = require('http');

var TheBigOne = require("./lib/thebigone");
var app = TheBigOne(config);

var Twitter = require('./lib/twitter');
var twitter = Twitter(config);
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ];
var stream = twitter.stream('statuses/filter', { locations: sanFrancisco });

var sockjs = require('./lib/socket.js')(config, stream);

var server = http.createServer(app);

sockjs.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:' + config.app.port );
server.listen(config.app.port, '0.0.0.0');

//thebigone(config).listen(config.app.port);
