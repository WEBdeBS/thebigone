
module.exports = function(config, stream) {
	var sockjs_opts = {sockjs_url: "http://cdn.sockjs.org/sockjs-0.3.min.js"};
	var sockjs = require('sockjs').createServer(sockjs_opts);
	sockjs.on('connection', function(client) {
		stream.on('tweet', function(tweet) {
			console.log(tweet);
			if (tweet.coordinates) {
				var json = JSON.stringify({
					text: tweet.text,
					coordinates: tweet.coordinates.coordinates
				});
				client.write(json);
			}
		});
	});
	return sockjs;
}