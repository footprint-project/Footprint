myApp.controller('ProjectDialogController', function (UserService, csvService, $mdDialog, $interval, $location) {
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.items = ['Health', 'Food/Nutrition', 'Education', 'Non-Food Items (NFI)', 'Shelter', 'Conflict', 'Migration/Camp Management', 'Faith-based', 'Research', 'Governance', 'Business/Entrepeneur', 'Donor'];
    vm.selected = [];

    //This function sends checkboxes
    vm.change = function (item, active) {

        if (active) {
            vm.selected.push(item);
            var data = item;

        } else {
            vm.selected.splice(vm.selected.indexOf(item), 1);
        }

    }; //End checkboxes function

    //This function sends checkboxes to the User Service.
    vm.postCheckboxes = function(){
        var sendData = vm.selected;
        vm.userService.countryIn = sendData;
    };
//This function sends user data to the service.
    vm.getUserData = function(user){
        vm.userService.sendProject(user);

        
    };

    vm.hide = function() {
        $mdDialog.hide();
    }

});//End Project Dialog Controller
