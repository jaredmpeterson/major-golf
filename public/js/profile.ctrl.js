angular.module('majorGolf')
	.controller('profileCtrl', function ($scope,  user) {
		$scope.title = "Profile";
		$scope.user = user;
	})
