angular.module('majorGolf')
	.service('golferService', function ($http) {

		this.getGolfers = function () {
			return $http({
				method: 'GET',
				url: '/golfers'
			}).then(function (data) {
				return data.data;
			})
		}

		this.newGolfer = function (golfer) {
				$http({
					method: 'POST',
					url: '/golfers',
					data: golfer
				})
			},

			this.updateGolfer = function (golfer) {
				return $http({
					method: 'PUT',
					url: '/golfers/' + golfer._id,
					data: golfer
				})
			}
	})
