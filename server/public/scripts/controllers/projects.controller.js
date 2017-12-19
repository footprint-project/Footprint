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

    //gets the footprints for selected project
    vm.getProjectFootprints = function (id) {
        console.log('in pc getProFoo', id);
        UserService.getProjectFootprints(id).then(function(response){
            vm.projectFootprints = UserService.selectedProjectFootprints;
            console.log(vm.projectFootprints);
            //add alert for catch
        }).catch(function (error) {
            console.log(error, 'error getting footprints for selected project');
        });
    };

    //for page load
    vm.getProjectFootprints(vm.clickedProject.id);

    // click function for selecting project to view
    vm.changeSelected = function(){
        vm.clickedProject = UserService.clickedProject;
    }

    //function for displaying selected project
    vm.showSelected = function() {
        console.log('show selected', vm.selectedIndex);
        vm.changeSelected();
        vm.getProjectFootprints(vm.clickedProject.id);
    }
    vm.showSelected();

    //this is for when the project is selected from projects page instead of from dashboard
    vm.showAnotherProject = function (ev, i) {
        UserService.userProjects.selectedIndex = i;
        console.log('clicked showAnotherProject', i);
        vm.clickedProject = UserService.userProjects[i];
        vm.getProjectFootprints(vm.clickedProject.id);
        //window.location.reload(i);
    };
    
});