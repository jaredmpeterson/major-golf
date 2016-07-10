angular.module('majorGolf').controller('gameCtrl', function($scope, gameService, $q) {

  // console.log(games);


  // VARIABLES
  // ============================================================
  $scope.majorgames = function() {
    var games = gameService.getGame();
    games.then(function(games) {
      $scope.games = games;
    });
  };

  $scope.majorgames();
  
  // FUNCTIONS
  // ============================================================
  $scope.getGames = function() {
    gameService.getGame().then(function(response) {
      $scope.games = response;
    });
  };

  $scope.createGame = function(game) {
    gameService.createGame(game).then(function(response) {
      $scope.getGames();
    });
  };

  $scope.updateGame = function(id, updatedGame) {
    gameService.editGame(id, updatedGame).then(function(response) {
      $scope.getGames();
    });
  };

  $scope.deleteGame = function(id) {
    gameService.deleteGame(id).then(function(response) {
      $scope.getGames();
    });
  };

  setTimeout(function() {
    $scope.getGames();
  }, 500)
});
