$(document).ready(function() {
	var BO_namespace = {};
	BO_namespace.map = "";

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


	BO_namespace.map = new google.maps.Map(
		document.getElementById("map_canvas"), {
		center: new google.maps.LatLng(41.910964, 12.46114),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});


});
