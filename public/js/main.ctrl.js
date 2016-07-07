angular.module('majorGolf')
.controller('mainCtrl', function($scope, userService) {
  $scope.home = true;
  userService.getUser()
    .then(function(res) {
      $scope.user = res;
    });
})
