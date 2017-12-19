myApp.service('UserService', function ($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.calc = {data: []};
  self.userProjects = {};
  self.countries = {data: []};
  self.months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
  self.result = {};
  self.lineGraphData={};
  self.footprintsFootprint = {};
  self.clickedProject = {};


  const PLANE_CONVERSION = 0.18026;
  const CAR_CONVERSION = 0.18568;
  const TRAIN_CONVERSION = 0.01225;
  const AIR_CONVERSION = 1.45648;
  const FREIGHT_CONVERSION = 2.60016;
  const TRUCK_CONVERSION = 0.10559;
  const SEA_CONVERSION = 0.008979;
  const HOTEL_CONVERSION = 31.1;
  const FUEL_CONVERSION = 2.60016;
  const GRID_CONVERSION = 0.35156;
  const PROPANE_CONVERSION = 0.1864;

  var fpfp = {};


  //Get user function
  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
      if(response.data.username) {
        // user has a current session on the server
        console.log(response.data);
        self.userObject.userName = response.data.username;
        self.userObject.organization = response.data.organization;
        self.userObject.name = response.data.name;
        self.userObject.position = response.data.position;
        self.userObject.id = response.data.id;
        console.log('UserService -- getuser -- User Data: ', self.userObject.userName, self.userObject.organization, self.userObject.id);
      } else {
        console.log('UserService -- getuser -- failure');
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    })
  }, //End get user function

  //Function that logs out user
  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  } //End of Logout Function

  self.getCountries = function() {
    console.log('Getting countries');
    $http.get('/member/countries').then(function(response) {
      var countries = response.data.rows;
      // console.log(countries);
      self.countries.data = countries;
      // console.log(self.countries.data);
    })
  }
  self.getCountries();
  // console.log(self.countries.data);

 self.getLineGraphData = function (){
    console.log('Getting Line graph Data');
    return $http.get('member/linegraph').then(function(response){
      return self.lineGraphData = response.data.rows;
    });
  }


  //gets the users projects for the projects view
  self.getProjects = function (id) {
    console.log('Getting user projects', id);
    $http.get('member/userprojects/' + id).then(function (response) {
      self.userProjects = response.data;
      console.log('user projects', self.userProjects);
    });
  };

//this got accidentally duplicated somehow:
  // self.computeFootprint = function(footprint) {
  //   console.log('hi', footprint);
  //   var result = {};
  //   result.plane = PLANE_CONVERSION * parseInt(footprint[0].plane);
  //   result.car = CAR_CONVERSION * parseInt(footprint[0].car);
  //   result.train = TRAIN_CONVERSION * parseInt(footprint[0].train);
  //   result.air = AIR_CONVERSION * parseInt(footprint[0].air);
  //   result.freight_train = FREIGHT_CONVERSION * parseInt(footprint[0].freight_train);
  //   result.truck = TRUCK_CONVERSION * parseInt(footprint[0].truck);
  //   result.sea = SEA_CONVERSION * parseInt(footprint[0].sea);
  //   result.hotel = HOTEL_CONVERSION * parseInt(footprint[0].hotel);
  //   result.fuel = FUEL_CONVERSION * parseInt(footprint[0].fuel);
  //   result.grid = GRID_CONVERSION * parseInt(footprint[0].grid);
  //   result.propane = PROPANE_CONVERSION * parseInt(footprint[0].propane);
  //   console.log(result);
  //   return result;
  // };

  self.groupByCategory = function(footprint) {
    var result = {};
    // console.log(footprint);
    result.living = footprint.hotel + footprint.fuel + footprint.grid + footprint.propane;
    result.shipping = footprint.sea + footprint.air + footprint.truck + footprint.freight_train;
    result.travel = footprint.plane + footprint.train + footprint.car;
    self.result = result;
    // console.log(self.result);
    return self.result;
  };

    self.computeFootprint = function(footprint) {
      console.log(footprint);
      var result = {};
      result.plane = PLANE_CONVERSION * parseInt(footprint.plane);
      result.car = CAR_CONVERSION * parseInt(footprint.car);
      result.train = TRAIN_CONVERSION * parseInt(footprint.train);
      result.air = AIR_CONVERSION * parseInt(footprint.air);
      result.freight_train = FREIGHT_CONVERSION * parseInt(footprint.freight_train);
      result.truck = TRUCK_CONVERSION * parseInt(footprint.truck);
      result.sea = SEA_CONVERSION * parseInt(footprint.sea);
      result.hotel = HOTEL_CONVERSION * parseInt(footprint.hotel);
      result.fuel = FUEL_CONVERSION * parseInt(footprint.fuel);
      result.grid = GRID_CONVERSION * parseInt(footprint.grid);
      result.propane = PROPANE_CONVERSION * parseInt(footprint.propane);
      result.period = footprint.period;
      result.name = footprint.name;
      result.type_id = footprint.type_id;
      result.country_id = footprint.country_id;
      console.log(result);
      return result;
    };

    self.groupByCategory = function(footprint) {
      var result = {};
      // console.log(footprint);
      result.living = footprint.hotel + footprint.fuel + footprint.grid + footprint.propane;
      result.shipping = footprint.sea + footprint.air + footprint.truck + footprint.freight_train;
      result.travel = footprint.plane + footprint.train + footprint.car;
      self.result = result;
      // console.log(self.result);
      return self.result;
    };

    // var computeFpfp = function() {
    //   self.computeFootprint(self.footprintsFootprint);
    // };


  // var fpfp = {};

  self.getFootprintsFootprint = function() {
    return $http.get('/member/footprints_footprint').then(function(response) {
      self.footprintsFootprint = response.data;
      //ahhhhh yes back to basics over here, chris reminds me that we need to pass this returned value into the next function:
      var data = self.computeFootprint(self.footprintsFootprint[0]);
      return self.groupByCategory(data);
    }).catch(function(err) {
      console.log('oh noooooo', err);
    });
  };



  // self.getFpDividedByProject = function() {
  //   return $http.get('/member/footprint_by_project').then(function(response) {
  //     console.log(response.data);
  //     var allTheStuff = response.data;
  //     var cleanedStuff = [];
  //     cleanedStuff.push(allTheStuff[0]);
  //
  //     for (var i=1; i<allTheStuff.length; i++) {
  //       var current = allTheStuff[i];
  //       var prev = allTheStuff[i - 1];
  //       if (current.name !== prev.name) {
  //         cleanedStuff.push(current);
  //       }
  //     }
  //     console.log(cleanedStuff);
  //   }).catch(function(err) {
  //     console.log('uh oh', err);
  //   });
  // };
  //
  // self.getFpDividedByProject();
  //
  //
  // self.getFpDividedByPeriod = function() {
  //   return $http.get('/member/footprint_by_period').then(function(response) {
  //     console.log(response.data);
  //     var allTheStuff = response.data;
  //     var cleanedStuff = [];
  //     cleanedStuff.push(allTheStuff[0]);
  //
  //     for (var i=1; i<allTheStuff.length; i++) {
  //       var current = allTheStuff[i];
  //       var prev = allTheStuff[i - 1];
  //       if (current.period !== prev.period) {
  //         cleanedStuff.push(current);
  //       }
  //     }
  //     console.log(cleanedStuff);
  //   }).catch(function(err) {
  //     console.log('uh oh', err);
  //   });
  // };
  //
  // self.getFpDividedByPeriod();

  self.computeTrialFootprint = function(footprint) {
    // console.log(footprint);
    footprint.train = footprint.train_travel;
    footprint.freight_train = footprint.train_shipping;
    // console.log(self.computeFootprint(footprint));
    var data = self.computeFootprint(footprint);
    return self.groupByCategory(data);

  };



  // self.getFpDividedByPeriod();








}); //End of UserService
