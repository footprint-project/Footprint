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
        console.log('in pc getProFoo', id);
        UserService.getProjectFootprints(id).then(function(response){
            vm.projectFootprints = UserService.selectedProjectFootprints;
            console.log('footprints:', vm.projectFootprints);
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
        console.log('show selected', vm.selectedIndex);
        vm.changeSelected();
        vm.getProjectFootprints(vm.clickedProject.id);
    };
    vm.showSelected();

    //this is for when the project is selected from projects page instead of from dashboard
    vm.showAnotherProject = function (ev, i) {
        UserService.userProjects.selectedIndex = i;
        console.log('clicked showAnotherProject', i);
        vm.clickedProject = UserService.userProjects[i];
        vm.getProjectFootprints(vm.clickedProject.id);
        //window.location.reload(i);
    };

    //Opens edit dialog box.
    vm.editModal = function(event, index) {
        vm.userService.userObj.selectedIndex = index;
        console.log('open dialog', index);

        $mdDialog.show({
            controller: 'projecteditdcontroller as pec',
            templateUrl: '/views/templates/projecteditdialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
        });
    };//End edit dialog box function.

    // vm.deleteModal = function (event, index) {
    //     vm.userService.userObj.selectedIndex = index;
    //     console.log('Delete controller open');
    //
    //     $mdDialog.show({
    //         controller: 'ProjectController as pc',
    //         templateUrl: '/views/templates/deleteconfirmdialog.html',
    //         parent: angular.element(document.body),
    //         targetEvent: event,
    //         clickOutsideToClose: true
    //     });
    // };

    vm.hide = function(){
        $mdDialog.hide();
    };

    // vm.deleteFootprint = function () {
    //     var index = vm.userObj.selectedIndex;
    //     console.log(index);
    //     var fp = UserService.selectedProjectFootprints[index];
    //     console.log(fp);
    //
    // };


    vm.deleteThis = function(ev, x) {
      console.log(x);

      var confirm = $mdDialog.confirm()
      .clickOutsideToClose(true)
      .title("Are you sure?")
      .targetEvent(ev)
      .ok('Delete it!')
      .cancel("No, go back!");

      $mdDialog.show(confirm).then(function() {
        console.log('whatup');
        $http.delete('/member/delete/' + x).then(function(response) {
          console.log(response);
        }).catch(function(err) {
          console.log(err);
        });
      }, function() {
        console.log('hi there');
      });

    };

});
