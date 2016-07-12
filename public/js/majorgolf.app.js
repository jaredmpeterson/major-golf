angular.module('majorGolf', ['ngAnimate', 'ui.router'])
	.config(function ($stateProvider, $urlRouterProvider) {
		// Config
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('login', {
				url: '/',
				templateUrl: 'views/login.html'
			})
			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html',
				authenticate: true
			})
			.state('golfers', {
				url: '/golfers',
				templateUrl: './views/golfers.html',
				controller: 'golferCtrl',
				resolve: {
					golfers: function (golferService) {
						return golferService.getGolfers();
					}
				}
			}).state('players', {
				url: '/players',
				templateUrl: 'views/players.html',
				controller: 'userCtrl',
				resolve: {
					users: function (userService) {
						return userService.getUsers();
					}
				}
			})
			.state('user', {
				url: '/players/:id',
				templateUrl: 'views/profile.html',
				controller: 'userCtrl',
				resolve: {
					user: function (userService) {
						return userService.getUser();
					}
				}
			})
	})
	.directive("jared", function () {
		return {
			restrict: 'E',
			transclude: true,
			// scope: {},
			templateUrl: 'views/nav.html',
			controller: 'mainCtrl'
		}
	})
	.directive('gameList', function () {
		return {
			restrict: 'E',
			// scope: {},
			templateUrl: 'views/games.html',
			controller: 'gameCtrl'
		}
	})
	.directive('events', function () {
		return {
			restrict: 'E',
			// scope: {},
			templateUrl: 'views/event.html',
			controller: 'eventCtrl'
		}
	});
