angular.module('majorGolf')
	.service('userService', function ($http) {

		this.getUsers = function () {
			return $http({
				method: 'GET',
				url: '/users'
			}).then(function (response) {
        // console.log(data);
        // console.log(data.data);
        return response.data;
			})
		};

	})
