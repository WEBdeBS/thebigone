var BO_namespace = {};

function mapDataController($scope) {

	// 37.78, -122.41
	$scope.heatmapData = [
        {location: new google.maps.LatLng(37.78, -122.41), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.411), weight: 2},
        {location: new google.maps.LatLng(37.78, -122.414), weight: 3},
        {location: new google.maps.LatLng(37.78, -122.416), weight: 2},
        {location: new google.maps.LatLng(37.78, -122.419), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.418), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.421), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.423), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.424), weight: 0.5},
        {location: new google.maps.LatLng(37.78, -122.438), weight: 3},
        {location: new google.maps.LatLng(37.78, -122.439), weight: 2},
        {location: new google.maps.LatLng(37.78, -122.440), weight: 0.5}
    ];

//$scope.init = function() {
// $scope.map = new google.maps.Map(angular.element("#map_canvas"), {
// center: new google.maps.LatLng(37.78, 12.46114),
// zoom: 8,
// mapTypeId: google.maps.MapTypeId.ROADMAP
// });
// $scope.$apply();
//};

	$scope.updateMap = function() {
		if (BO_namespace.map !== "") {

			var heatmap = new google.maps.visualization.HeatmapLayer({
				data: $scope.heatmapData
//				data: BO_namespace.heatmapData
			});
			heatmap.setMap(BO_namespace.map);
			//$scope.$apply();
		}
	};

	$scope.foo = BO_namespace.foo;

	$scope.addHeatPoint = function() {
		window.setInterval(function() {
			console.log("adding heat point...");
			$scope.heatmapData.push({
					location: new google.maps.LatLng(37.78, -122.41),
					weight: 2
				}
			);
		}, 1000);
	};

}