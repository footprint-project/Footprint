myApp.controller('projecteditdcontroller', function ($http, UserService, csvService, $mdDialog, $interval) {
    var vm = this;
    vm.userService - UserService;
    vm.userObj = UserService.userObj;
    console.log('project edit controller created');
    vm.project = []

    vm.populateProjects = function(userObj){
        var index = vm.userService.userObj.selectedIndex;
        vm.
    }
});