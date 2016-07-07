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
			golfers: function (golferService) {
				return golferService.getGolfers();
			}
		}
	}).state('users', {
		url: '/users',
		templateUrl: 'views/profile.html',
		controller: 'userCtrl',
		resolve: {
			users: function (userService) {
				return userService.getUsers();
			}
		}
	})
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
}).directive("jared", function() {
    return {
        restrict: 'E',
        transclude: true,
        // scope: {},
        templateUrl: 'views/nav.html',
				controller: 'mainCtrl'
    }});
