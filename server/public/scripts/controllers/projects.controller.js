myApp.controller('ProjectController', function ($http, UserService, csvService, $mdDialog, $interval) {
    console.log('ProjectController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.selectedIndex = UserService.userProjects.selectedIndex;
    vm.clickedProject = UserService.clickedProject;
    vm.projectFootprints = [];
    vm.userObj = UserService.userObj;

    //gets the footprints for selected project
    vm.getProjectFootprints = function (id) {

        UserService.getProjectFootprints(id).then(function(response){
            vm.projectFootprints = UserService.selectedProjectFootprints;

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
    };

    //function for displaying selected project
    vm.showSelected = function() {

        vm.changeSelected();
        vm.getProjectFootprints(vm.clickedProject.id);
    };
    vm.showSelected();

    //this is for when the project is selected from projects page instead of from dashboard
    vm.showAnotherProject = function (ev, i) {
        UserService.userProjects.selectedIndex = i;

        vm.clickedProject = UserService.userProjects[i];
        vm.getProjectFootprints(vm.clickedProject.id);

    };

    //Opens edit dialog box.
    vm.editModal = function(event, index) {
        vm.userService.userObj.selectedIndex = index;

        $mdDialog.show({
            controller: 'projecteditdcontroller as pec',
            templateUrl: '/views/templates/projecteditdialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };//End edit dialog box function.

    vm.deleteModal = function (event, index) {
        vm.userService.userObj.selectedIndex = index;

        $mdDialog.show({
            controller: 'ProjectController as pc',
            templateUrl: '/views/templates/deleteconfirmdialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };

    vm.hide = function(){
        $mdDialog.hide();
    };



    vm.deleteThis = function(ev, x) {


      var confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title("Are you sure?")
      .targetEvent(ev)
      .ok('Delete it!')
      .cancel("No, go back!");

      $mdDialog.show(confirm).then(function() {


        $http.delete('/member/delete/' + x).then(function(response) {

          for (var i=0; i<vm.projectFootprints.length; i++) {
            var fp = vm.projectFootprints[i];
            if (fp.id == x) {
              vm.projectFootprints.splice(i, 1);
            }
          }

        }).catch(function(err) {
          console.log(err);
        });
      }, function() {
        console.log('hi there');
      });

    };

});
