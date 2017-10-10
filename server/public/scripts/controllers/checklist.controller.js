myApp.controller('ChecklistController', function (ChecklistService, AdminService, $routeParams, $mdDialog) {
  // console.log('ChecklistController created');
  var vm = this;
  vm.AdminService = AdminService;
  vm.ChecklistService = ChecklistService;

  // Call to populate Checklist 
  ChecklistService.getVehicleInfo($routeParams.checklist_id);
  vm.cars_checklist = ChecklistService.vehicleInfo;

  vm.oilCheckListVisible = false;

  vm.finishCheckListVisible = false;

  vm.goto = function (page) {
    console.log("Goto " + "'" + page + "'");
    $location.path("'" + page + "'")
  }

  vm.showOilRequired = function (show) {
    if (show == 'Y') {
      vm.cars_checklist.info.oilchange = true;
      vm.oilCheckListVisible = true;
    } else {
      vm.cars_checklist.info.oilchange = false;
      vm.oilCheckListVisible = false;
    }

  };

  vm.showFinishChecklist = function (show) {
    if (show == 'Y') {
      vm.cars_checklist.info.finishup_checklist = true;
      vm.finishCheckListVisible = true;
    } else {
      vm.cars_checklist.info.finishup_checklist = false;
      vm.finishCheckListVisible = false;
    }
  };


  vm.submitChecklist = function (checklist) {
    console.log('Checklist Save', checklist);
    checklist.info.checklist_id = $routeParams.checklist_id;
    checklist.info.checklist_status = 'in_progress';
    ChecklistService.submitChecklist(checklist.info);
  }

  vm.redFlag = function (failedItem) {
    // console.log('Item Failed');
    $mdDialog.show({
      controller: 'ChecklistController as cc',
      templateUrl: '/views/partials/vehicleobservations.html',
      parent: angular.element(document.body),
      targetEvent: failedItem,
      clickOutsideToClose:true
    })
  }

  vm.vehicleObservationPopUp = function (value) {
    $mdDialog.hide();
    
  }
});
