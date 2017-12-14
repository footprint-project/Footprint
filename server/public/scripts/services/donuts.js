
myApp.service('donutService', function($http, $location, UserService) {
  console.log('donutService Loaded');

  self.getFpDividedByProject = function() {
    return $http.get('/member/footprint_by_project').then(function(response) {
      // console.log(response.data);
      var allTheStuff = response.data;
      var cleanedStuff = [];
      cleanedStuff.push(allTheStuff[0]);

      for (var i=1; i<allTheStuff.length; i++) {
        var current = allTheStuff[i];
        var prev = allTheStuff[i - 1];
        if (current.name !== prev.name) {
          cleanedStuff.push(current);
        }
      }
      // console.log(cleanedStuff);
      var projects = [];
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
      // console.log(response.data);
      var allTheStuff = response.data;
      var cleanedStuff = [];
      cleanedStuff.push(allTheStuff[0]);

      for (var i=1; i<allTheStuff.length; i++) {
        var current = allTheStuff[i];
        var prev = allTheStuff[i - 1];
        if (current.period !== prev.period) {
          cleanedStuff.push(current);
        }
      }

      var periods = [];
      for (var j=0; j<cleanedStuff.length; j++) {
        periods.push(UserService.computeFootprint(cleanedStuff[j]));
      }
      // console.log(cleanedStuff);
      console.log(periods);
    }).catch(function(err) {
      console.log('uh oh', err);
    });
  };

  self.getFpDividedByPeriod();




  self.getDonut = function(view, thing, slice) {
    var instructions = {view: view, thing: thing, slice: slice};
    $http.post('/member/donut/', instructions).then(function(response) {
      console.log(response);
    }).catch(function(err) {
      console.log(err);
    });
  };

  self.getDonut('period', '03/2017', 'type');




});
