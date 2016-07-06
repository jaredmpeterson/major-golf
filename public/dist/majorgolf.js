'use strict';

angular.module('majorGolf').controller('golferCtrl', function ($scope, golfers) {
	$scope.golfers = golfers;
	$scope.title = "Golfers";
});
'use strict';

angular.module('majorGolf').service('golferService', function ($http) {

	this.getGolfers = function () {
		return $http({
			method: 'GET',
			url: '/golfers'
		}).then(function (data) {
			return data.data;
		});
	};

	this.newGolfer = function (golfer) {
		$http({
			method: 'POST',
			url: '/golfers',
			data: golfer
		});
	}, this.updateGolfer = function (golfer) {
		return $http({
			method: 'PUT',
			url: '/golfers/' + golfer._id,
			data: golfer
		});
	};
});
'use strict';

angular.module('majorGolf').controller('mainCtrl', function ($scope) {
  $scope.home = true;
});
'use strict';

angular.module('majorGolf', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  }).state('home', {
    url: '/home',
    templateUrl: 'views/home.html'
  }).state('golfers', {
    url: '/golfers',
    templateUrl: './views/golfers.html',
    controller: 'golferCtrl',
    resolve: {
      golfers: function golfers(golferService) {
        return golferService.getGolfers();
      }
    }
  });
});