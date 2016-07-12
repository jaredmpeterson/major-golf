angular.module('majorGolf').controller('eventCtrl', function($scope, eventService, $q) {

  // console.log(events);


  // VARIABLES
  // ============================================================
  $scope.majorevents = function() {
    var events = eventService.getEvent();
    events.then(function(events) {
      $scope.events = events;
    });
  };

  $scope.majorevents();

  // FUNCTIONS
  // ============================================================
  $scope.getEvents = function() {
    eventService.getEvent().then(function(response) {
      $scope.events = response;
    });
  };

  $scope.createEvent = function(event) {
    eventService.createEvent(event).then(function(response) {
      $scope.getEvents();
    });
  };

  $scope.updateEvent = function(id, updatedEvent) {
    eventService.editEvent(id, updatedEvent).then(function(response) {
      $scope.getEvents();
    });
  };

  $scope.deleteEvent = function(id) {
    eventService.deleteEvent(id).then(function(response) {
      $scope.getEvents();
    });
  };

  setTimeout(function() {
    $scope.getEvents();
  }, 500)
});
