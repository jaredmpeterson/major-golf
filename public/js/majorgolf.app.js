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
  .state('user', {
		url: '/users/:id',
		templateUrl: 'views/profile.html',
		controller: 'userCtrl',
		resolve: {
			users: function (userService) {
				return userService.getUsers();
			}
		}
	})
});
