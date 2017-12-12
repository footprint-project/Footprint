myApp.service('UserService', function($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.calc = {data: []};

  //Get user function
  self.getuser = function(){
    console.log('UserService -- getuser');
    $http.get('/user').then(function(response) {
        if(response.data.username) {
            // user has a curret session on the server
            self.userObject.userName = response.data.username;
            self.userObject.organization = response.data.organization;
            console.log('UserService -- getuser -- User Data: ', self.userObject.userName, self.userObject.organization);
        } else {
            console.log('UserService -- getuser -- failure');
            // user has no session, bounce them back to the login page
            $location.path("/home");
        }
    },function(response){
      console.log('UserService -- getuser -- failure: ', response);
      $location.path("/home");
    });
  }, //End get user function

//Function that logs out user
  self.logout = function() {
    console.log('UserService -- logout');
    $http.get('/user/logout').then(function(response) {
      console.log('UserService -- logout -- logged out');
      $location.path("/home");
    });
  } //End of Logout Function

  //This function will calculate carbon footprint data
  // self.calculations = function(footprint) {
  //   console.log('Calcs running');
  //   for (var i=0; i<footprint[i].length; i++) {
  //     calc[i].plane = (footprint[i].plane[0] * .18026);
  //     calc[i].car = (footprint[i].car[1] * .18568);
  //     calc[i].train = (footprint[i].train[2] * .01225);
  //     calc[i].hotel = (footprint[i].hotel[3] * 31.1);
  //     calc[i].generator = (footprint[i].generator[4] * 2.60016271124822);
  //     calc[i].grid = (footprint[i].grid[5] * 0.35156);
  //     calc[i].propane = (footprint[i].proprane[6] * 0.186455554041745);
  //     calc[i].air = (footprint[i].air[7] * 1.45648);
  //     calc[i].truck = (footprint[i].truck[8] * 0.10559);
  //     calc[i].sea = (footprint[i].sea[9] * 0.008979 );
  //     self.calc.data = calc;
  //     console.log(self.calc.data);
  //   }
  // }
  // self.calculations(footprint);

}); //End of UserService

