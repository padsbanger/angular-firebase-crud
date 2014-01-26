'use strict';

myApp.controller('UserCtrl', function($scope, UserService, $firebase, $firebaseSimpleLogin, $rootScope, $location) {

  $scope.users = UserService;
  $scope.isLogged;
  var dataRef = new Firebase('https://shining-fire-2806.firebaseio.com/users');
  $scope.account = $firebaseSimpleLogin(dataRef);


  // TODO: Fix animation for pulling data
  $scope.users.$on('loaded', function() {
    console.log('data loaded');
    $scope.loaded = true;
  });

  $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
    console.log("User " + user.id + " successfully logged in!");
  });

  $rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
    console.log("User successfully logged out!");
  });

  // TODO: make it less buggy, work on real user input
  $scope.login = function() {
    $scope.account.$login('password', {
      email: 'kontakt@michal-lach.pl',
      password: 'root'
    }).then(function(user) {
      console.log('Logged in as: ', user.email);
      $location.path('/');
    }, function(error) {
        console.error('Login failed: ', error);
      });
  };

  $scope.logout = function() {
    $scope.account.$logout();
  }

  $scope.register = function() {
    $scope.account.$createUser('kontakt@michal-lach.pl', 'root');
  };

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