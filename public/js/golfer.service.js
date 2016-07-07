angular.module('majorGolf')
	.service('golferService', function ($http) {

		this.getGolfers = function () {
			return $http({
				method: 'GET',
				url: '/api/golfers'
			}).then(function (data) {
				return data.data;
			})
		}

		this.newGolfer = function (golfer) {
				$http({
					method: 'POST',
					url: '/api/golfers',
					data: golfer
				})
			},

			this.updateGolfer = function (golfer) {
				return $http({
					method: 'PUT',
					url: '/api/golfers/' + golfer._id,
					data: golfer
				})
			}
	})
