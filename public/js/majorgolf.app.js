angular.module('majorGolf', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login.html'
  }).state('home', {
    url:'/home',
    templateUrl: 'views/home.html'
  })
});
