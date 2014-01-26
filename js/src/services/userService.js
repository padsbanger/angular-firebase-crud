myApp.factory('UserService', function($firebase){
  return $firebase(new Firebase('https://shining-fire-2806.firebaseio.com/users'));
});