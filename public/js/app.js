$(document).ready(function() {

    function doSomething() {}

	function add(Lat, Long) {
		BO_namespace.heatmapData.push({
				location: new google.maps.LatLng(Lat, Long),
				weight: 1
			}
		);
	}

    var reHeat = 50;
	BO_namespace.map = "";
	BO_namespace.heatmapData = [];

	var Lat = 51.525834;
	var Lang = -0.119682;

	BO_namespace.map = new google.maps.Map(
		document.getElementById("map_canvas"), {
		center: new google.maps.LatLng(Lat, Lang),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var sockjs_url = '/echo';
	var sockjs = new SockJS(sockjs_url);

	sockjs.onopen = function()  {
		console.log('[*] open', sockjs.protocol);
        var mouvable_marker = new google.maps.Marker({
            map: BO_namespace.map,
            icon: '/media/img/pin.png',
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(Lat, Lang)
        });
        google.maps.event.addListener(mouvable_marker, 'click', doSomething);
	};
    
	sockjs.onmessage = function(e) {
        reHeat = (reHeat == 0 ? 50 : reHeat);
		var tweet = JSON.parse(e.data);
		var Lat = tweet.coordinates[1];
		var Lang = tweet.coordinates[0];
		add(Lat, Lang);
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(Lat, Lang),
			  map: BO_namespace.map,
			  title: tweet.text
		 });
    }

	sockjs.onclose   = function()  {
		console.log('[*] close');
	};

	setInterval(function() {
		var heatmap = new google.maps.visualization.HeatmapLayer({
			data: BO_namespace.heatmapData
		});
		heatmap.setMap(BO_namespace.map);
	}, 10000);

});
