var config = require('config');
var http  = require('http');

var TheBigOne = require("./lib/thebigone");
var app = TheBigOne(config);

var Twitter = require('./lib/twitter');
var twitter = Twitter(config);

var Lat1 = -1;
var Lang1 = 51;
var Lat2 = 1;
var Lang2 = 52;

var stream = twitter.stream('statuses/filter', { locations: [ Lat1, Lang1, Lat2, Lang2 ] });

var sockjs = require('./lib/socket.js')(config, stream);

var server = http.createServer(app);

sockjs.installHandlers(server, {prefix:'/echo'});

console.log(' [*] Listening on 0.0.0.0:' + config.app.port );
server.listen(config.app.port, '0.0.0.0');

//thebigone(config).listen(config.app.port);
