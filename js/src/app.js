'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'firebase']).

config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl'
	})
	.when('/edit/:id', {
		templateUrl: 'views/userEdit.html',
		controller: 'EditUserCtrl'
	})
	.when('/new', {
		templateUrl: 'views/new.html',
		controller: 'UserCtrl'
	});
	
}]);

