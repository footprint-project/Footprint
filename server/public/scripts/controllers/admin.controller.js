myApp.controller('AdminController', function (UserService, $http) {
    console.log('AdminController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.allUsers = UserService.users;




    vm.computedFps = [];

    function checkAdminRoute() {
      $http.get('/admin/users').then(function(response) {
        for (var i=0; i < response.data.totals.length; i++) {
          var fp = response.data.totals[i];
          var fpComp = UserService.computeFootprint(fp);
          var total = fpComp.air + fpComp.truck + fpComp.sea + fpComp.freight_train + fpComp.propane + fpComp.fuel + fpComp.grid + fpComp.hotel + fpComp.train + fpComp.car + fpComp.plane;
          var organization = fpComp.organization;
          var fpObj = {
            total: Math.round(total,1),
            organization: organization
          };
          vm.computedFps.push(fpObj);
        }
        for (var j=0; j<vm.computedFps.length; j++) {
          for (var k=0; k<response.data.otherStuff.length; k++) {
            var other = response.data.otherStuff[k];
            var fpc = vm.computedFps[j];
            if (other.organization == fpc.organization) {
              fpc.name = other.name;
              fpc.position = other.position;
              fpc.username = other.username;
            }
          }
        }
        // console.log(vm.computedFps);
      }).catch(function(err) {
        // console.log(err);
      });
    }

    checkAdminRoute();


    //for page load, is displayed on DOM
    // gettingUsers();

});
