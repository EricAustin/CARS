myApp.controller('AdminController', function(AdminService) {
  console.log('AdminController created');
  var vm = this;
  vm.AdminService = AdminService;
  vm.userObject = AdminService.userObject;
});
