myApp.controller('ProjectController', function (UserService) {
    console.log('ProjectController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.selectedIndex = UserService.userProjects.selectedIndex;
    vm.clickedProject = UserService.clickedProject;
    
    vm.showSelected = function() {
        console.log('show selected', vm.selectedIndex);
        vm.clickedProject = UserService.clickedProject
        console.log(vm.clickedProject);
    }
    vm.showSelected();

    vm.showAnotherProject = function (ev, i) {
        UserService.userProjects.selectedIndex = i;
        console.log('clicked showAnotherProject', i);
        vm.clickedProject = UserService.userProjects[i];
        console.log(vm.clickedProject);
        //window.location.reload(i);
    };

    
});