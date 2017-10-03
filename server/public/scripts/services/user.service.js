myApp.service('AdminService', function ($http, $location) {
  console.log('AdminService Loaded');

  vm = this
  vm.userObject = {};
  vm.Requests = { list: [] }
  vm.Prints = { list: [] }

  vm.getRequests = function () {
    $http.get('/RequestsForService').then(function (response) {
      console.log('getRequests', response);
      vm.Requests.list = response;

    })
  }

  vm.getPrints = function () {
    $http.get('/RequestsForService/printable').then(function (response) {
      console.log('PRINTS Requests', response);
      vm.Prints.list = response;
    })
  }

  vm.getuser = function () {
    console.log('AdminService -- getuser');
    $http.get('/user').then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        vm.userObject.userName = response.data.username;
        vm.userObject.role = response.data.role;
        console.log('AdminService -- getuser -- User Data: ', vm.userObject);
      } else {
        console.log('AdminService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    }, function (response) {
      console.log('AdminService -- getuser -- failure: ', response);
      $location.path("/home");
    });


    vm.logout = function () {
      console.log('AdminService -- logout');
      $http.get('/user/logout').then(function (response) {
        console.log('AdminService -- logout -- logged out');
        $location.path("/home");
      });
    }
  };
});
