$(document).ready(function() {
	BO_namespace.map = "";
	BO_namespace.heatmapData = [];

	BO_namespace.map = new google.maps.Map(
		document.getElementById("map_canvas"), {
		center: new google.maps.LatLng(37.78, -122.41),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var sockjs_url = '/echo';
	var sockjs = new SockJS(sockjs_url);

	sockjs.onopen    = function()  {
		console.log('[*] open', sockjs.protocol);
	};
	sockjs.onmessage = function(e) {
		var tweet = JSON.parse(e.data);
//		$('ul').append($('<li/>').html(tweet.text));
		var coord = tweet.place.bounding_box.coordinates[0][0];
//		add(coord[1], coord[0]);
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(coord[1], coord[0]),
			  map: BO_namespace.map,
			  title: tweet.text
		  });
	};
	sockjs.onclose   = function()  {
		console.log('[*] close');
	};

//	var heatmap = new google.maps.visualization.HeatmapLayer({
//		data: BO_namespace.heatmapData
//	});
//	heatmap.setMap(BO_namespace.map);

	function add(Lat, Long) {
		console.log("adding heat point... " + Lat + ' ' + Long);

		BO_namespace.heatmapData.push({
				location: new google.maps.LatLng(Lat, Long),
				weight: 2
			}
		);
	}
});
