// INITILIZE SERVICE
// ============================================================
angular.module('majorGolf').service('eventService', function($http) {

  // CRUD FUNCTIONS
  // ============================================================
  this.getEvent = function(id) {
    // var query = "";
    // if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/api/event'
    }).then(function(response) {
      return response.data;
    });
  };
  this.createEvent = function(event) {
    return $http({
      method: 'POST',
      url: '/api/event',
      data: event
    }).then(function(response) {
      return response;
    });
  };
  this.editEvent = function(id, event) {
    return $http({
      method: 'PUT',
      url: "/api/event/" + id,
      data: event
    }).then(function(response) {
      return response;
    });
  };
  this.deleteEvent = function(id) {
    return $http({
      method: 'DELETE',
      url: '/api/event/' + id
    }).then(function(response) {
      return response;
    });
  };

  // OTHER FUNCTIONS
  // ============================================================


});
