angular.module('view', ['ngCookies']);
angular.module('view')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		on: on,
		onBrandSelected: function(callback) {
			on('car-service-bookings.Garage.Brands.selected', callback);
		},
		onModelSelected: function(callback) {
			on('car-service-bookings.Garage.Models.selected', callback);
		}
	};
}])
.controller('ViewController', ['$scope', '$cookies', '$messageHub', function ($scope, $cookies, $messageHub) {

	$scope.reload = function() {
		var brand = $cookies.get('Car-Service-Brand');
		var model = $cookies.get('Car-Service-Model');
		var url = 'http://localhost:8080/services/v3/web/car-service-bookings-extension/extensions/views/fileName/index.html?q=' + brand;
		if (model) {
			url += '+' + model;
		}
		window.location.href = url;
	};

	$messageHub.onBrandSelected(function(e) {
		$cookies.put('Car-Service-Brand', e.data.name);
		$scope.reload();
	});

	$messageHub.onModelSelected(function(e) {
		$cookies.put('Car-Service-Model', e.data.name);
		$scope.reload();
	});
}]);