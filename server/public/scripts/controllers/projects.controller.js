myApp.controller('ProjectController', function (UserService) {
    console.log('ProjectController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.selectedIndex = UserService.userProjects.selectedIndex;
    
    vm.showSelected = function() {
        console.log('show selected', vm.selectedIndex);
    }
    vm.showSelected();
});