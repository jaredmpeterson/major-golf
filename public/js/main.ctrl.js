angular.module('majorGolf')
.controller('mainCtrl', function($scope, userService, $q) {
  $scope.home = true;
  $scope.currentUser = function() {
    var user = userService.getMe();
    user.then(function(me) {
      $scope.user = me;
      $scope.profile = me.profile;
    });
  }

  $scope.currentUser();

})
