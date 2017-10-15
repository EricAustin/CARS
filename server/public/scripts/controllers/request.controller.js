myApp.controller('RequestController', function (AdminService, RequestService, $location) {
  console.log('RequestController created');
  
  //jquery mask pulg in for phone number validation
  $('.maskPhone').mask('(000) 000-0000');

  var vm = this;
  vm.RequestService = RequestService;
  vm.AdminService = AdminService;
  vm.customer = RequestService.customer;
  vm.textboxShowing = false;
  
  //will always set "service status" to requested when form is submitted by customer 
  vm.customer = { service_status: 'requested' };

 //highlights Request for Service Form in nav bar when on that page 
  vm.currentNavItem = "serviceRequestTab";
  
  //opens image of the car with description of where to find VIN 
  vm.openCard = false;

  //this function is called when "submit" is clicked on the Request for Service form 
  vm.addCustomer = function () {
    vm.RequestService.addCustomer(vm.customer);
  }
  
  vm.openTextbox = function () {
    vm.textboxShowing = true;
  };

  vm.closeTextbox = function() {
    vm.textboxShowing = false;
  };


  vm.card = function() {
    vm.openCard = true
  };

  vm.cardClose = function () {
    vm.openCard = false;
  };
});


