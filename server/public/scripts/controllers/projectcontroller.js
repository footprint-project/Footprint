myApp.controller('ProjectDialogController', function (UserService, csvService, $mdDialog, $interval) {
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
            console.log(item);
            var data = item;
            var sendData = angular.copy(data);
            vm.userService.countryIn = data;
        } else {
            vm.selected.splice(vm.selected.indexOf(item), 1);
        }
    }; //End checkboxes function

    vm.getUserData = function(user){
        vm.userService.sendProject(user);
    };



});//End Project Dialog Controller