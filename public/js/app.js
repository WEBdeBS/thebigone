$(document).ready(function() {
	var sockjs_url = '/echo';
	var sockjs = new SockJS(sockjs_url);

	sockjs.onopen    = function()  {
		console.log('[*] open', sockjs.protocol);
	};
	sockjs.onmessage = function(e) {
		var tweet = JSON.parse(e.data);
		console.log(tweet);
		$('ul').append($('<li/>').html(tweet.text));
	};
	sockjs.onclose   = function()  {
		console.log('[*] close');
	};

});
