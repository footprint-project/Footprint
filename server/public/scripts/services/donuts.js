
myApp.service('donutService', function($http, $location, UserService) {
  console.log('donutService Loaded');
  // var self = this;

//amateur hour over here, i forgot to assign the crucial variable:
  var self = this;

  self.getFpDividedByProject = function() {
    return $http.get('/member/footprint_by_project').then(function(response) {
      //because the sql query gives us rows with repeated info, we have to sanitize it, i.e. put it in a form that the compute-conversion function can eat:
      var allTheStuff = response.data;
      var cleanedStuff = [];
      //grab the first element of the array:
      cleanedStuff.push(allTheStuff[0]);

      //and then for each subsequent element, check whether its previous element has a different project name:
      for (var i=1; i<allTheStuff.length; i++) {
        var current = allTheStuff[i];
        var prev = allTheStuff[i - 1];
        if (current.name !== prev.name) {
          cleanedStuff.push(current);
        }
      }
      var projects = [];
      //compute the conversion to find the footprint for each project in cleanedStuff:
      for (var j=0; j<cleanedStuff.length; j++) {
        projects.push(UserService.computeFootprint(cleanedStuff[j]));
      }
      console.log(projects);
    }).catch(function(err) {
      console.log('uh oh', err);
    });
  };

  self.getFpDividedByProject();


  self.getFpDividedByPeriod = function() {
    return $http.get('/member/footprint_by_period').then(function(response) {

      //because the sql query gives us rows with repeated info, we have to sanitize it:

      console.log(response.data);

      var allTheStuff = response.data;
      var cleanedStuff = [];
      //grab the first element of the array:
      cleanedStuff.push(allTheStuff[0]);

      //and then for each subsequent element, check whether its previous element has a different period; if so, add it to the sanitized array:
      for (var i=1; i<allTheStuff.length; i++) {
        var current = allTheStuff[i];
        var prev = allTheStuff[i - 1];
        if (current.period !== prev.period) {
          cleanedStuff.push(current);
        }
      }

      var periods = [];
      //compute the conversion to find the footprint for each period in cleanedStuff:
      for (var j=0; j<cleanedStuff.length; j++) {
        periods.push(UserService.computeFootprint(cleanedStuff[j]));
      }


      console.log(cleanedStuff);

      console.log(periods);
      return periods;
    }).catch(function(err) {
      console.log('uh oh', err);
    });
  };

  self.getFpDividedByPeriod();



//testing the donut function:
  self.getDonut = function(view, slice) {
    //i know with req.query there's a way to do this, but i'm just cheating:
    var instructions = {view: view, particular: '2016-03-01', slice: slice};
    // var instructions = {view: view, particular: 'living', slice: slice};


    return $http.post('/member/donut/', instructions).then(function(response) {
      // console.log(response);

      return response;

    }).catch(function(err) {
      console.log(err);
    });
  };

  // self.getDonut('project', '03/2017', 'type');




});
