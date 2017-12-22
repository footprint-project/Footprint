myApp.controller('projecteditdcontroller', function ($http, UserService, csvService, $mdDialog, $interval) {
    var vm = this;
    vm.userService = UserService;
    vm.userObj = UserService.userObj;
    console.log('project edit controller created');
    vm.projects = []

    //This gets the user info into the controller
    vm.populateProjects = function (userObj) {
        var index = vm.userObj.selectedIndex;
        vm.projects = UserService.selectedProjectFootprints[index];
        // vm.projects = UserService.projectFootprints[index];
        console.log(vm.projects);
    }
    vm.populateProjects();

    //Submit the CSV data.
    vm.submitData = function () {
        console.log('clicked upload');
        var file = document.getElementById('file').files[0];
        var result = new FileReader();
        result.onloadend = function (e) {
            var data = {data: e.target.result};
            data.project = vm.projects;
            console.log(data);
            UserService.sendEdits(data);
        };
        result.readAsBinaryString(file);
        console.log(result);
    };  //End CSV upload
    
});//This is the end of the project edit controller