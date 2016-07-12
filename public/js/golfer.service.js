angular.module('majorGolf')
	.service('golferService', function ($http, $stateParams) {

		this.getGolfers = function () {
			return $http({
				method: 'GET',
				url: '/api/pro'
			}).then(function (data) {
				return data.data;
			})
		}

		this.getGolfer = function () {
			return $http({
				method: 'GET',
				url: '/api/pro/'+$stateParams.id
			}).then(function (data) {
				console.log(data);
				return data.data;
			})
		}

		this.newGolfer = function (golfer) {
				$http({
					method: 'POST',
					url: '/api/pro',
					data: golfer
				})
			},

			this.updateGolfer = function (golfer) {
				return $http({
					method: 'PUT',
					url: '/api/pro/' + golfer._id,
					data: golfer
				})
			}
	})
