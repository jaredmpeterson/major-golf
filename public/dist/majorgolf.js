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
			url: '/api/golfers'
		}).then(function (data) {
			return data.data;
		});
	};

	this.newGolfer = function (golfer) {
		$http({
			method: 'POST',
			url: '/api/golfers',
			data: golfer
		});
	}, this.updateGolfer = function (golfer) {
		return $http({
			method: 'PUT',
			url: '/api/golfers/' + golfer._id,
			data: golfer
		});
	};
});
'use strict';

angular.module('majorGolf').controller('mainCtrl', function ($scope, userService, $q) {
  $scope.home = true;
  $scope.currentUser = function () {
    var user = userService.getMe();
    user.then(function (me) {
      $scope.user = me;
      $scope.profile = me.profile;
    });
  };

  $scope.currentUser();
});
'use strict';

angular.module('majorGolf', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('login', {
		url: '/',
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
	}).state('players', {
		url: '/players',
		templateUrl: 'views/profile.html',
		controller: 'userCtrl',
		resolve: {
			users: function users(userService) {
				return userService.getUsers();
			}
		}
	});
	// .state('user', {
	// 	url: '/users/:id',
	// 	templateUrl: 'views/profile.html',
	// 	controller: 'profileCtrl',
	// 	resolve: {
	// 		user: function (userService) {
	// 			return userService.getUser();
	// 		}
	// 	}
	// })
}).directive("jared", function () {
	return {
		restrict: 'E',
		transclude: true,
		// scope: {},
		templateUrl: 'views/nav.html',
		controller: 'mainCtrl'
	};
});
'use strict';

angular.module('majorGolf').controller('profileCtrl', function ($scope, user) {
	$scope.title = "Profile";
	// $scope.user = user;
});
'use strict';

angular.module('majorGolf').controller('userCtrl', function ($scope, users) {
	$scope.users = users;
	$scope.title = "Players";
});
'use strict';

angular.module('majorGolf').service('userService', function ($http, $q, $timeout) {

	this.getMe = function () {
		var defer = $q.defer();
		$http({
			method: 'GET',
			url: '/api/currentuser'
		}).then(function (response) {
			defer.resolve(response.data);
		});
		return defer.promise;
	};

	this.getUsers = function () {
		return $http({
			method: 'GET',
			url: '/api/users'
		}).then(function (response) {
			return response.data;
		});
	};
});