var Twit = require('twit');

module.exports = function Twitter(config) {
	return new Twit({
		consumer_key:         config.auth.twitter.consumer_key,
		consumer_secret:      config.auth.twitter.consumer_secret,
		access_token:         config.auth.twitter.access_token_key,
		access_token_secret:  config.auth.twitter.access_token_secret
	});
}