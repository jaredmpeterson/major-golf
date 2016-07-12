'use strict';

angular.module('majorGolf', ['ngAnimate', 'ui.router']).config(function ($stateProvider, $urlRouterProvider) {
	// Config
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('login', {
		url: '/',
		templateUrl: 'views/login.html'
	}).state('home', {
		url: '/home',
		templateUrl: 'views/home.html',
		authenticate: true
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
		templateUrl: 'views/players.html',
		controller: 'userCtrl',
		resolve: {
			users: function users(userService) {
				return userService.getUsers();
			}
		}
	}).state('user', {
		url: '/players/:id',
		templateUrl: 'views/profile.html',
		controller: 'userCtrl',
		resolve: {
			user: function user(userService) {
				return userService.getUser();
			}
		}
	});
}).directive("jared", function () {
	return {
		restrict: 'E',
		transclude: true,
		// scope: {},
		templateUrl: 'views/nav.html',
		controller: 'mainCtrl'
	};
}).directive('gameList', function () {
	return {
		restrict: 'E',
		// scope: {},
		templateUrl: 'views/games.html',
		controller: 'gameCtrl'
	};
}).directive('events', function () {
	return {
		restrict: 'E',
		// scope: {},
		templateUrl: 'views/event.html',
		controller: 'eventCtrl'
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

angular.module('majorGolf').controller('golferCtrl', function ($scope, golfers) {
	$scope.golfers = golfers;
	$scope.title = "Golfers";
	// $scope.pro = pro;
});
'use strict';

angular.module('majorGolf').service('golferService', function ($http, $stateParams) {

	this.getGolfers = function () {
		return $http({
			method: 'GET',
			url: '/api/pro'
		}).then(function (data) {
			return data.data;
		});
	};

	this.getGolfer = function () {
		return $http({
			method: 'GET',
			url: '/api/pro/' + $stateParams.id
		}).then(function (data) {
			console.log(data);
			return data.data;
		});
	};

	this.newGolfer = function (golfer) {
		$http({
			method: 'POST',
			url: '/api/pro',
			data: golfer
		});
	}, this.updateGolfer = function (golfer) {
		return $http({
			method: 'PUT',
			url: '/api/pro/' + golfer._id,
			data: golfer
		});
	};
});
'use strict';

angular.module('majorGolf').controller('gameCtrl', function ($scope, gameService, $q) {

  // console.log(games);

  // VARIABLES
  // ============================================================
  $scope.majorgames = function () {
    var games = gameService.getGame();
    games.then(function (games) {
      $scope.games = games;
    });
  };

  $scope.majorgames();

  // FUNCTIONS
  // ============================================================
  $scope.getGames = function () {
    gameService.getGame().then(function (response) {
      $scope.games = response;
    });
  };

  $scope.createGame = function (game) {
    gameService.createGame(game).then(function (response) {
      $scope.getGames();
    });
  };

  $scope.updateGame = function (id, updatedGame) {
    gameService.editGame(id, updatedGame).then(function (response) {
      $scope.getGames();
    });
  };

  $scope.deleteGame = function (id) {
    gameService.deleteGame(id).then(function (response) {
      $scope.getGames();
    });
  };

  setTimeout(function () {
    $scope.getGames();
  }, 500);
});
'use strict';

angular.module('majorGolf').controller('eventCtrl', function ($scope, eventService, $q) {

  // console.log(events);

  // VARIABLES
  // ============================================================
  $scope.majorevents = function () {
    var events = eventService.getEvent();
    events.then(function (events) {
      $scope.events = events;
    });
  };

  $scope.majorevents();

  // FUNCTIONS
  // ============================================================
  $scope.getEvents = function () {
    eventService.getEvent().then(function (response) {
      $scope.events = response;
    });
  };

  $scope.createEvent = function (event) {
    eventService.createEvent(event).then(function (response) {
      $scope.getEvents();
    });
  };

  $scope.updateEvent = function (id, updatedEvent) {
    eventService.editEvent(id, updatedEvent).then(function (response) {
      $scope.getEvents();
    });
  };

  $scope.deleteEvent = function (id) {
    eventService.deleteEvent(id).then(function (response) {
      $scope.getEvents();
    });
  };

  setTimeout(function () {
    $scope.getEvents();
  }, 500);
});
'use strict';

// INITILIZE SERVICE
// ============================================================
angular.module('majorGolf').service('eventService', function ($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getEvent = function (id) {
    // var query = "";
    // if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/api/event'
    }).then(function (response) {
      return response.data;
    });
  };
  this.createEvent = function (event) {
    return $http({
      method: 'POST',
      url: '/api/event',
      data: event
    }).then(function (response) {
      return response;
    });
  };
  this.editEvent = function (id, event) {
    return $http({
      method: 'PUT',
      url: "/api/event/" + id,
      data: event
    }).then(function (response) {
      return response;
    });
  };
  this.deleteEvent = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/event/' + id
    }).then(function (response) {
      return response;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================
});
'use strict';

// INITILIZE SERVICE
// ============================================================
angular.module('majorGolf').service('gameService', function ($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getGame = function (id) {
    // var query = "";
    // if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/api/games'
    }).then(function (response) {
      return response.data;
    });
  };
  this.createGame = function (game) {
    return $http({
      method: 'POST',
      url: '/api/games',
      data: game
    }).then(function (response) {
      return response;
    });
  };
  this.editGame = function (id, game) {
    return $http({
      method: 'PUT',
      url: "/api/games/" + id,
      data: game
    }).then(function (response) {
      return response;
    });
  };
  this.deleteGame = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/games/' + id
    }).then(function (response) {
      return response;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================
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