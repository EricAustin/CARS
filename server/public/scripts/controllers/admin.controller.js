myApp.controller('AdminController', function(AdminService, RequestService, AuthService) {
  console.log('AdminController created');
  var vm = this;
  vm.AdminService = AdminService;
  vm.userObject = AdminService.userObject;

  vm.showRequests = true;
  vm.InfoExpanded = false;
  vm.nrqstneeded = false;
  vm.showAuths = false;
  vm.showSearchs = false;
  vm.Prints = AdminService.Prints;
  vm.customer = {};
  vm.textboxShowing = false;
  vm.RetrievedRequests = AdminService.Requests;


  vm.makeRequestsVisible = function(){
    vm.showRequests = true;
    vm.showAuths = false;
    vm.showSearchs = false;
    console.log(vm.showRequests);
    }

  vm.showSearch = function(){
    vm.showRequests = false;
    vm.showSearchs = true;
    vm.nrqstneeded = false;
    vm.showAuths = false;

    console.log(vm.showRequests);
    }

  vm.expandInfo= function(){
    vm.InfoExpanded = true;  
    }

  vm.shrinkInfo=function(){
    vm.InfoExpanded=false;
    console.log('shrink button clicked'); 
    }

  vm.getRequests= function(){
    vm.Requests = AdminService.getRequests();

    }

  vm.AddRequest= function(){
    vm.nrqstneeded = true;
    }
  
  vm.ReduceRequest = function(){
    vm.nrqstneeded = false;
    vm.getRequests();
  }


  vm.search_history = function(z){
    console.log('search button hit, passed', z, 'as search stuff')
  
  }

  vm.showAuth = function () {
    vm.showAuths = true;
    vm.showRequests = false;
    vm.nrqstneeded = false;
    vm.showSearchs = false;
    console.log('meow');
    
  }
  
  vm.hideAuth = function () {
    vm.showAuths = false;
    console.log('woof')
  }

  vm.getPrint = function () {
    AdminService.getPrints()
  }

  vm.history_view= function(c){
      console.log(c);
      AuthService.getAuth(c)
      
    }


  /* this function is called when the submit form is clicked on the Request for Service form on the       website's requestService.html page. */
  vm.addCustomer = function () {
    vm.customer.service_status = "scheduled"; 
    RequestService.addCustomerNoEmail(vm.customer);
  }

  vm.updateCustomer = function (z,x){
    RequestService.updateCustomer(z,x)
  }

  vm.openTextbox = function () {
    vm.textboxShowing = true;
  };


  vm.removeCustomer = function (){
    console.log('remove button hit');
    
  }

  vm.getPrint();
  vm.getRequests();
  console.log(vm.RetrievedRequests)

});
