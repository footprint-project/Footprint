myApp.controller('ProjectController', function (UserService) {
    console.log('ProjectController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.selectedIndex = UserService.userProjects.selectedIndex;
    vm.clickedProject = UserService.clickedProject;
    vm.projectFootprints = [];


    vm.getProjectFootprints = function (id) {
        console.log('in pc getProFoo', id);
        UserService.getProjectFootprints(id).then(function(response){
            vm.projectFootprints = UserService.selectedProjectFootprints;
            console.log(vm.projectFootprints);
        });
    };

    vm.getProjectFootprints(vm.clickedProject.id);

    
    vm.changeSelected = function(){
        vm.clickedProject = UserService.clickedProject;
    }

    vm.showSelected = function() {
        console.log('show selected', vm.selectedIndex);
        vm.changeSelected();
        vm.getProjectFootprints(vm.clickedProject.id);
    }
    vm.showSelected();

    vm.showAnotherProject = function (ev, i) {
        UserService.userProjects.selectedIndex = i;
        console.log('clicked showAnotherProject', i);
        vm.clickedProject = UserService.userProjects[i];
        vm.getProjectFootprints(vm.clickedProject.id);
        //window.location.reload(i);
    };


    
});