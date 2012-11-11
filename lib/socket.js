
module.exports = function(config, stream) {
	var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
	var sockjs = require('sockjs').createServer(sockjs_opts);
	sockjs.on('connection', function(conn) {
		stream.on('tweet', function (tweet) {
			console.log(tweet);
			conn.write(JSON.stringify(tweet));
		});
//		conn.on('data', function(message) {
//			conn.write(message);
//		});
	});
	return sockjs;
}