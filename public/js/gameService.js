// INITILIZE SERVICE
// ============================================================
angular.module('majorGolf').service('gameService', function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getGame = function(id) {
    // var query = "";
    // if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/api/games'
    }).then(function(response) {
      return response.data;
    });
  };
  this.createGame = function(game) {
    return $http({
      method: 'POST',
      url: '/api/games',
      data: game
    }).then(function(response) {
      return response;
    });
  };
  this.editGame = function(id, game) {
    return $http({
      method: 'PUT',
      url: "/api/games/" + id,
      data: game
    }).then(function(response) {
      return response;
    });
  };
  this.deleteGame = function(id) {
    return $http({
      method: 'DELETE',
      url: '/api/games/' + id
    }).then(function(response) {
      return response;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================


});
