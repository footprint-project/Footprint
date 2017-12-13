myApp.service('UserService', function ($http, $location){
  console.log('UserService Loaded');
  var self = this;
  self.userObject = {};
  self.calc = {data: []};
  self.userProjects = {};
  self.countries = {data: []}
  self.months = ['January','February', 'March', 'April', 'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'];
  
  
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
    console.log(countries);
      self.countries.data = countries;
      console.log(self.countries.data);
    })
  }
  self.getCountries();
  console.log(self.countries.data);

  self.getLineGraphData = function (){
    console.log('Getting Line graph Data');
    $http.get('member/linegraph').then(function(response){
      var lineGraphData = response.data.rows;
      console.log(lineGraphData);
    })
  }



  self.getLineGraphData();

  //gets the users projects for the projects view
  self.getProjects = function (id) {
    console.log('Getting user projects', id);
    $http.get('member/userprojects/' + id).then(function (response) {
      self.userProjects = response.data;
      console.log('user projects', self.userProjects);  
    })
  }
  

}); //End of UserService

