angular.module('majorGolf')
	.controller('userCtrl', function ($scope, users) {
		$scope.users = users;
		$scope.title = "Players";
	})
