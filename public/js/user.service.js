angular.module('majorGolf')
	.service('userService', function ($http) {

		this.getUsers = function () {
			return $http({
				method: 'GET',
				url: '/api/users'
			}).then(function (response) {
        return response.data;
			})
		};

		this.getUser = function () {
			return $http({
				method: 'GET',
				url: '/api/currentuser'
			}).then(function (response) {
				return response.data;
			})
		};

	})
