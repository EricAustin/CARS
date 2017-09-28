myApp.factory('AdminService', function($http, $location){
  console.log('AdminService Loaded');

  var userObject = {};

  return {
    userObject : userObject,

    getuser : function(){
      console.log('AdminService -- getuser');
      $http.get('/user').then(function(response) {
          if(response.data.username) {
              // user has a curret session on the server
              userObject.userName = response.data.username;
              console.log('AdminService -- getuser -- User Data: ', userObject.userName);
          } else {
              console.log('AdminService -- getuser -- failure');
              // user has no session, bounce them back to the login page
              $location.path("/home");
          }
      },function(response){
        console.log('AdminService -- getuser -- failure: ', response);
        $location.path("/home");
      });
    },

    logout : function() {
      console.log('AdminService -- logout');
      $http.get('/user/logout').then(function(response) {
        console.log('AdminService -- logout -- logged out');
        $location.path("/home");
      });
    }
  };
});
