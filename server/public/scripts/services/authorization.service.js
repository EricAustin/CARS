myApp.service('AuthService', function ($http, $location) {
   console.log('AuthService Loaded');

   self = this
   self.userObject = {};
   self.Requests = { list: [] }

   self.getAuth = function (c) {
      $http.get('/authorization').then(function (response) {
         self.serviceObject = response.data[c];
         console.log('self.serviceObject is', self.serviceObject);

         $http.get('/authorization/' + self.serviceObject.customer_id).then(function (response) {
            self.checklistObject = response.data
            console.log('self.checklistObject is', self.checklistObject);
            $location.path('/authorization');
         })

      })

   }


   self.saveObject = function (serviceObject) {
      console.log('AuthService.saveObject hit');
      console.log('serviceObject is ', serviceObject);

      $http.put('/authorization', serviceObject).then(function (response) {
         console.log('AuthService.saveObject.then hit');
      })
   }

});
