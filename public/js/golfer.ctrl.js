angular.module('majorGolf')
	.controller('golferCtrl', function ($scope, golfers) {
		$scope.golfers = golfers;
		$scope.title = "Golfers";
	})
