'use strict';

myApp.controller('UserCtrl', function($scope, UserService, $firebase) {

  $scope.users =  UserService;
  $scope.message = '';

  $scope.users.$on('loaded', function() {
    $scope.loaded = true;
  });

  $scope.addUser = function(username) {
    var names = [];
    var keys = $scope.users.$getIndex();
    keys.forEach(function(key) {
      names.push($scope.users[key].name);
    });
    if(_.filter(names, function(name) { return name.toLowerCase() === username.toLowerCase() }).length !== 0) {
      $scope.message = 'duplikat';
    } else {
      UserService.$add({name: username});
      $scope.message = '';
    }
    
  };

  $scope.deleteUser = function(id) {
    UserService.$remove(id);
  };

  $scope.clearUsers = function() {
    UserService.$remove();
    $scope.message = '';
  };

});