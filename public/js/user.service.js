angular.module('majorGolf')
	.service('userService', function ($http, $q, $timeout) {

		this.getMe = function () {
			var defer = $q.defer();
			$http({
				method: 'GET',
				url: '/api/currentuser'
			}).then(function (response) {
				defer.resolve(response.data);
			})
			return defer.promise;
		};

		this.getUsers = function () {
			return $http({
				method: 'GET',
				url: '/api/users'
			}).then(function (response) {
        return response.data;
			})
		};
	})
