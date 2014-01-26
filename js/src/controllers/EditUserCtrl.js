'use strict';

myApp.controller('EditUserCtrl', function($scope, UserService, $routeParams, $firebase, $location) {

  var userUrl = 'https://shining-fire-2806.firebaseio.com/users/' + $routeParams.id;
  var users = UserService;

  $scope.user = $firebase(new Firebase(userUrl));
  
  $scope.updateUser = function () {
    var names = [];
    var keys = users.$getIndex();
    keys.forEach(function(key) {
      names.push(users[key].name);
    });
    if(_.filter(names, function(name) { return name.toLowerCase() === $scope.user.name.toLowerCase() }).length !== 0) {
      $scope.message = 'User already exists';
    } else {
      $scope.user.$save();
      $location.path('/');
    }
  };

});