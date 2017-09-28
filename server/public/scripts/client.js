var myApp = angular.module('myApp', ['ngRoute']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/login.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.landing.html',
      controller: 'AdminController as uc',
      resolve: {
        getuser : function(AdminService){
          return AdminService.getuser();
        }
      }
    })
    .when('/mechanic', {
      templateUrl: '/views/templates/mechanic.landing.html',
      controller: 'MechanicController',
      resolve: {
        getuser : function(AdminService){
          return AdminService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
