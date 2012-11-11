function mapDataController($scope) {

	$scope.heatmapData = [
        {location: new google.maps.LatLng(41.910964, 12.473), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.471), weight: 2},
        {location: new google.maps.LatLng(41.910964, 12.474), weight: 3},
        {location: new google.maps.LatLng(41.910964, 12.476), weight: 2},
        {location: new google.maps.LatLng(41.910964, 12.479), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.478), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.481), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.483), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.484), weight: 0.5},
        {location: new google.maps.LatLng(41.910964, 12.498), weight: 3},
        {location: new google.maps.LatLng(41.910964, 12.499), weight: 2},
        {location: new google.maps.LatLng(41.910964, 12.500), weight: 0.5}
    ];

//$scope.init = function() {
// $scope.map = new google.maps.Map(angular.element("#map_canvas"), {
// center: new google.maps.LatLng(41.910964, 12.46114),
// zoom: 8,
// mapTypeId: google.maps.MapTypeId.ROADMAP
// });
// $scope.$apply();
//};

	$scope.updateMap = function() {
		if (BO_namespace.map !== "") {

			var heatmap = new google.maps.visualization.HeatmapLayer({
				data: $scope.heatmapData
			});
			heatmap.setMap(BO_namespace.map);
			//$scope.$apply();
		}
	};

	$scope.addHeatPoint = function() {
		window.setInterval(function() {
			console.log("adding heat point...");
			$scope.heatmapData.push({
					location: new google.maps.LatLng(43, 13),
					weight: 2
				}
			);
		}, 1000);
	};

}