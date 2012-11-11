$(document).ready(function() {

    function doSomething() {}

    var reHeat = 50;
    var heatedUI = 0;
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

	sockjs.onopen = function()  {
		console.log('[*] open', sockjs.protocol);
        var mouvable_marker = new google.maps.Marker({
            map: BO_namespace.map,
            icon: '/media/img/pin.png',
            draggable:true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(37.782, -122.443)
        });
        google.maps.event.addListener(mouvable_marker, 'click', doSomething);
	};
    
	sockjs.onmessage = function(e) {
        reHeat = (reHeat == 0 ? 50 : reHeat);
        heatMapData = [
            {location: new google.maps.LatLng(37.782, -122.447), weight: 0.5},
            new google.maps.LatLng(37.782, -122.445),
            {location: new google.maps.LatLng(37.782, -122.443), weight: 2},
            {location: new google.maps.LatLng(37.782, -122.441), weight: 3},
            {location: new google.maps.LatLng(37.782, -122.439), weight: 2},
            new google.maps.LatLng(37.782, -122.437),
            {location: new google.maps.LatLng(37.782, -122.435), weight: 0.5},

            {location: new google.maps.LatLng(37.785, -122.447), weight: 3},
            {location: new google.maps.LatLng(37.785, -122.445), weight: 2},
            new google.maps.LatLng(37.785, -122.443),
            {location: new google.maps.LatLng(37.785, -122.441), weight: 0.5},
            new google.maps.LatLng(37.785, -122.439),
            {location: new google.maps.LatLng(37.785, -122.437), weight: 2},
            {location: new google.maps.LatLng(37.785, -122.435), weight: 3}
        ];
		var tweet = JSON.parse(e.data);
//		$('ul').append($('<li/>').html(tweet.text));
		var coord = tweet.place.bounding_box.coordinates[0][0];
		add(coord[1], coord[0]);
		var marker = new google.maps.Marker({
			  position: new google.maps.LatLng(coord[1], coord[0]),
			  map: BO_namespace.map,
			  title: tweet.text
		 });

        if (reHeat === 50) {
            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: BO_namespace.heatmapData
            });
            heatmap.setMap(BO_namespace.map);
            console.log('heatedui: ' + ++   heatedUI);
        }

    reHeat--;
    console.log(reHeat);

    }

	sockjs.onclose   = function()  {
		console.log('[*] close');
	};


	function add(Lat, Long) {
		console.log("adding heat point... " + Lat + ' ' + Long);

		BO_namespace.heatmapData.push({
				location: new google.maps.LatLng(Lat, Long),
				weight: 10
			}
		);
	}
});
