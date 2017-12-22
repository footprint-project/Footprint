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
  self.users = [];
  self.userObj = { selectedIndex: 0 };
  self.selectedProjectFootprints = [];
  



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
        return self.userObject;
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
      window.location.href = '/#/home';
      // $location.path("/home");
    });
  } //End of Logout Function

  self.getCountries = function() {
    console.log('Getting countries');
    $http.get('/member/countries').then(function(response) {
      var countries = response.data.rows;
      // console.log(countries);
      self.countries.data = countries;
      console.log(self.countries.data);
    })
  }
  self.getCountries();
  // console.log(self.countries.data);

//this will be for getting user data for a line graph...?
//  self.getLineGraphData = function (){
//     console.log('Getting Line graph Data');
//     return $http.get('member/linegraph').then(function(response){
//       return self.lineGraphData = response.data.rows;
//     });
//   }

  //gets the users projects for the projects view
  self.getProjects = function (id) {
    console.log('Getting user projects', id);
    return $http.get('member/userprojects/' + id).then(function (response) {
      return self.userProjects = response.data;
      self.selectedProjectFootprints = response.data;
      console.log('user projects', self.userProjects);
    }).catch(function (err) {
      console.log('problem getting projects', err);
    });
  };

  //gets the footprints for selected project
  self.getProjectFootprints = function (id){
    return $http.get('/member/project_footprints/'+ id).then(function (response) {
      console.log(response.data.rows);
      return self.selectedProjectFootprints = response.data.rows;
    }).catch(function (err) {
      console.log('problem getting project footprints', err);
    });
  };

  //gets all the users for admin page
self.adminGetUsers = function () {
  console.log('Getting users for admin');
  return $http.get('admin/users').then(function(response) {
    console.log(response.data);
    self.users = response.data;
    return self.users;
    console.log('users for admin', self.users);
  }).catch(function (err) {
    console.log('problem getting all users for admin', err);
  });
};

  self.computeFootprint = function(footprint) {
    console.log(footprint[0]);
    var result = {};
    result.plane = PLANE_CONVERSION * parseInt(footprint[0].plane);
    result.car = CAR_CONVERSION * parseInt(footprint[0].car);
    result.train = TRAIN_CONVERSION * parseInt(footprint[0].train);
    result.air = AIR_CONVERSION * parseInt(footprint[0].air);
    result.freight_train = FREIGHT_CONVERSION * parseInt(footprint[0].freight_train);
    result.truck = TRUCK_CONVERSION * parseInt(footprint[0].truck);
    result.sea = SEA_CONVERSION * parseInt(footprint[0].sea);
    result.hotel = HOTEL_CONVERSION * parseInt(footprint[0].hotel);
    result.fuel = FUEL_CONVERSION * parseInt(footprint[0].fuel);
    result.grid = GRID_CONVERSION * parseInt(footprint[0].grid);
    result.propane = PROPANE_CONVERSION * parseInt(footprint[0].propane);
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

    self.computeFootprint = function(footprint) {
      // console.log(footprint);
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
      result.organization = footprint.organization
      // console.log(result);
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



  self.computeTrialFootprint = function(footprint) {
    // console.log(footprint);
    footprint.train = footprint.train_travel;
    footprint.freight_train = footprint.train_shipping;
    // console.log(self.computeFootprint(footprint));
    var data = self.computeFootprint(footprint);
    return self.groupByCategory(data);

  };

    // self.countryIn;

  // self.getFpDividedByPeriod();

//This uploads the data for a new project:
 self.sendProject = function(user){
   var project = user;
   project.project = self.countryIn;
   console.log(project);
   $http.post('/member/newproject', project).then(function(response) {
     console.log(response);
   }).catch(function(error) {
     console.log(error);
   });
};

//This function sends edited footprints to the DB.
 self.sendEdits = function (dataIn) {
 var data = dataIn.data;
 var footprintInfo = dataIn.project;
 console.log(data, footprintInfo);
   var csvSend = {
     plane: 0,
     car: 0,
     train_travel: 0,
     air: 0,
     train_shipping: 0,
     truck: 0,
     sea: 0,
     hotel: 0,
     fuel: 0,
     grid: 0,
     propane: 0
   };

   var dataNums = data.slice(data.lastIndexOf('kWh'), data.indexOf(',,,,,,,,,,'));
   //  console.log(dataNums);

   var arrayOfNums = dataNums.split(',');
   console.log(arrayOfNums);

   for (var i = 0; i < arrayOfNums.length; i++) {
     var num = arrayOfNums[i];
     if (i % 11 == 1 && num !== '') {
      csvSend.plane += Number(num);
     } else if (i % 11 == 2 && num !== '') {
      csvSend.car += Number(num);
     } else if (i % 11 == 3 && num !== '') {
      csvSend.train_travel += Number(num);
     } else if (i % 11 == 4 && num !== '') {
      csvSend.air += Number(num);
     } else if (i % 11 == 5 && num !== '') {
      csvSend.train_shipping += Number(num);
     } else if (i % 11 == 6 && num !== '') {
      csvSend.truck += Number(num);
     } else if (i % 11 == 7 && num !== '') {
      csvSend.sea += Number(num);
     } else if (i % 11 == 8 && num !== '') {
      csvSend.hotel += Number(num);
     } else if (i % 11 == 9 && num !== '') {
      csvSend.fuel += Number(num);
     } else if (i % 11 == 10 && num !== '') {
      csvSend.grid += Number(num);
     } else if (i % 11 == 0 && num !== '' && i > 1) {
      csvSend.propane += Number(num);
     }
   }

   if (csvSend.type === 'English') {
     csvSend.plane = Math.round((csvSend.plane * 1.609344));
     csvSend.car = Math.round((csvSend.car * 1.609344));
     csvSend.train_travel = Math.round((csvSend.train_travel * 1.609344));
     csvSend.air = Math.round((csvSend.air * 1.460));
     csvSend.train_shipping = Math.round((csvSend.train_shipping * 1.460));
     csvSend.truck = Math.round((csvSend.truck * 1.460));
     csvSend.sea = Math.round((csvSend.sea * 1.460));
     csvSend.projectInfo = footprintInfo;
     console.log('Post English conversion,' + csvSend);

   } else {
     csvSend.projectInfo = footprintInfo;
     console.log('add variable,' + csvSend.projectInfo);
   }
   self.sendEditsOut(csvSend);

   csvSend = {
    plane: 0,
    car: 0,
    train_travel: 0,
    air: 0,
    train_shipping: 0,
    truck: 0,
    sea: 0,
    hotel: 0,
    fuel: 0,
    grid: 0,
    propane: 0
  };

 }//End send function

 self.sendEditsOut = function (csvSend) {
   $http.put('/member/project_edit', csvSend).then(function (response) {
     console.log('send footprint', response);
   }).catch(function (error) {
     console.log('error sending footprint', error)
   })

 }


}); //End of UserService