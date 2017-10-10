myApp.controller('AuthController', function (AuthService, RequestService) {
    console.log('AuthController created');

    var self = this;
    self.AuthService = AuthService;
    self.serviceObject = AuthService.serviceObject;
    self.checklistObject = AuthService.checklistObject;
    // scope = $rootScope;
    // scope.serviceObject = AuthService.serviceObject;
    self.date = new Date();

    // AuthService.getAuth()
    

    self.updateCustomer = function (z, x) {
        self.saveAuth();
        RequestService.updateCustomer(z, x)
    }

    self.printDiv = function () {
        self.saveAuth();
        window.print();
        console.log('self.checklistObject',self.checklistObject);
        
    }

    self.saveAuth = function () {
        self.serviceObject.current_mileage = self.checklistObject[0].current_mileage;
        console.log('self.checklistObject[0].current_mileage',self.checklistObject.current_mileage);
        
        console.log('saveAuth hit serviceObject is', self.serviceObject);
        AuthService.saveObject(self.serviceObject)
    }

    // scope.$watch('serviceObject', self.logMe, true)

    $('authName').css('width', ((authName.getAttribute('ng-model').length + 1) * 8) + 'px');
    $('authSR').css('width', ((authSR.getAttribute('ng-model').length + 1) * 8) + 'px');

});

