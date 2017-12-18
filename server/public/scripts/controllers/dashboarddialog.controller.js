myApp.controller('DashboardDialogController', function (UserService, csvService, $mdDialog, $interval) {
    console.log('DashboardDialogController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    // vm.countries = UserService.countries.data;
    vm.months = UserService.months;
    // vm.countries = UserService.countries.data;
    vm.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
     'September', 'October', 'November', 'December'];
    vm.years = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];
    // vm.items = ['Health', 'Food/Nutrition', 'Education', 'Non-Food Items (NFI)', 'Shelter', 'Conflict', 'Migration/Camp Management', 'Faith-based', 'Research', 'Governance', 'Business/Entrepeneur', 'Donor'];
    // vm.selected = [];

    // //This function sends checkboxes
    // vm.change = function (item, active) {
    //     if (active) {
    //       vm.selected.push(item);
    //       console.log(item);
    //       var data = item;
    //       var sendData = angular.copy(data);
    //       csvService.projectChecks(sendData);
    //     } else {
    //       vm.selected.splice(vm.selected.indexOf(item), 1);
    //     }
    //   }; //End checkboxes function

   //This function carries out the CSV upload.
     vm.uploadFile = function () {
   
       console.log('clicked upload');
       var f = document.getElementById('file').files[0];
       var r = new FileReader();
       r.onloadend = function (e) {
         var data = e.target.result;
         // console.log(data);
         csvService.parseFootprint(data);
       };
       r.readAsBinaryString(f);
       console.log(r);
     };  //End CSV upload

//This function will get the user Data from the DOM
    vm.getUserData = function(user) {
     console.log(user);
     csvService.sendUser(user);
    }

    //This function gets either metric or english
    vm.dataType = function (data) {
      console.log(data);
      csvService.dataType = data;
    }

}); //End Dialog controller