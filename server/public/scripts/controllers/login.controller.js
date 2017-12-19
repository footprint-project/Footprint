 myApp.controller('LoginController', function ($http, $location, $timeout, $filter, UserService, donutService, csvService, $mdDialog) {

    console.log('LoginController created');
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';
    vm.UserService = UserService;
    vm.months = UserService.months;
    vm.countries = UserService.countries.data;
    vm.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
     'September', 'October', 'November', 'December'];
    vm.years = [2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011];
    vm.items = ['Health', 'Food/Nutrition', 'Education', 'Non-Food Items (NFI)', 'Shelter', 'Conflict', 'Migration/Camp Management', 'Faith-based', 'Research', 'Governance', 'Business/Entrepeneur', 'Donor'];
    vm.selected = [];
    vm.userFootprint = csvService.userFootprint;
    vm.lineData = [];

    //This function monitors the checkboxes on the DOM.
  //   vm.change = function (item, active) {
  //    if (active) {
  //      vm.selected.push(item);
  //      console.log(item);
  //      var data = item;
  //      var sendData = angular.copy(data);
  //      csvService.typeData(sendData);
  //    } else {
  //      vm.selected.splice(vm.selected.indexOf(item), 1);
  //    }
  //  };

   donutService.getFpDividedByPeriod();

//re-draws the donut graph with trial data:
   vm.donutDataSetTrial = function(x){
       vm.donutResult = x;
       console.log(vm.donutResult);
      new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["Living", "Travel", "Shipping"],
          datasets: [
            {
              label: "CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [vm.donutResult.living, vm.donutResult.travel, vm.donutResult.shipping]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint'
          }
        }
      });

   };

//This function carries out the CSV upload.
  vm.uploadFile = function () {
    console.log('clicked upload');
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function (e) {
      var data = e.target.result;
      // console.log(data);
      csvService.parseData(data).then(function(response) {
        console.log(response);
        vm.donutDataSetTrial(response);
      });
    };
    r.readAsBinaryString(f);
    // console.log(csvService.trialData);
  };





   // start doughnut
  vm.donutDataSet = function(){
    UserService.getFootprintsFootprint().then(function(response){
      vm.donutResult = response;
      console.log(vm.donutResult);
    new Chart(document.getElementById("doughnut-chart"), {
      type: 'doughnut',
      data: {
        labels: ["Living", "Travel", "Shipping"],
        datasets: [
          {
            label: "CO2",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [vm.donutResult.living, vm.donutResult.travel, vm.donutResult.shipping]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Total Footprint'
        }
      }
    });
  });
  };


  vm.donutDataSet();

  // gets the data for the landing page lineChart displaying footprints carbon impact
  vm.lineChart = function(){
    donutService.getFpDividedByPeriod().then(function(response){
      vm.lineData = response;
      var month = '';
      var sum = 0;
      console.log(vm.lineData);
      var periodArray = [];
      var sumsArray = [];
      for (var i=0; i<vm.lineData.length; i+=1){
        lineData = vm.lineData[i];
        sum = lineData.air + lineData.car + lineData.freight_train + lineData.fuel + lineData.grid + lineData.hotel + lineData.plane + lineData.propane + lineData.sea + lineData.train + lineData.truck;
        sumsArray.push(sum);
        console.log(sumsArray);
        month = $filter('date')(vm.lineData[i].period, 'MMM yy');
        console.log(month);
        periodArray.push(month);
        // console.log(periodArray);
      }
      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: periodArray,
          datasets: [{
            //make an array with the sum of all categories
            data: sumsArray,
            label: "CO2",
            borderColor: "#3e95cd",
            fill: false
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Carbon Footprint'
          }
        }
      });
    }).catch(function (error) {
      console.log(error, 'error with line graph data footprints by period');
    });
  };
  vm.lineChart();

// var years = [1500];

// var africa = [86,114,106];
// var asia = [282,350,411];
// var europe = [168,170,178];
// var latinAmerica = [40,20,10];
// var northAmerica = [6,3,2];
//   var ctx = document.getElementById("myChart");
//   var myChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: years,
//       datasets: [
//         {
//           data: africa,
//           label: "Africa",
//           backgroundColor: "#3e95cd",
//           // fill: true
//         },
//         {
//           data: asia,
//           label: "Asia",
//           backgroundColor: "#FF7E52",
//           // fill: true
//         },
//         {
//           data: europe,
//           label: "Europe",
//           backgroundColor: "#4DDBF2",
//           // fill: true
//         }

//       ]
//     }
//   });
  // end doughnut
    vm.login = function() {
      console.log('LoginController -- login');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Enter your username and password!";
      } else {
        console.log('LoginController -- login -- sending to server...', vm.user);
        $http.post('/', vm.user).then(function(response) {
          if(response.data.username) {
            console.log('LoginController -- login -- success: ', response.data);
            // location works with SPA (ng-route)
            $location.path('/user'); // http://localhost:5000/#/user
          } else {
            console.log('LoginController -- login -- failure: ', response);
            vm.message = "Please try again!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Please try again!";
        });
      }
    };

    vm.registerUser = function() {
      console.log('LoginController -- registerUser');
      if(vm.user.username === '' || vm.user.password === '') {
        vm.message = "Choose a username and password!";
      } else {
        console.log('LoginController -- registerUser -- sending to server...', vm.user);
        $http.post('/register', vm.user).then(function(response) {
          console.log('LoginController -- registerUser -- success');
          $location.path('/home');
        }).catch(function(response) {
          console.log('LoginController -- registerUser -- error');
          vm.message = "Please try again."
        });
      }
    }

    //This function will get the user Data from the DOM
    vm.getUserData = function(user) {
     console.log(user);
     csvService.userData(user);
      
    }


    vm.dataType = function(data) {
      console.log(data);
      csvService.dataType = data;
    };
















//BARS:

    vm.barBy = '';
    vm.barParticular = '';
    vm.barResults = [];

    vm.activeSelector = '';

//why is this not working????????
//i have truly no idea what changed to make it start working...
    vm.changeBarView = function() {
      var data = {view: vm.barBy};
      $http.post('/member/bars', data).then(function(response) {
        console.log(response);
        vm.barResults = response.data;

        if (vm.barBy == 'project') {
          vm.activeSelector = 'project';
        } else if (vm.barBy == 'period') {
          vm.activeSelector = 'period';
        } else if (vm.barBy == 'type') {
          vm.activeSelector = 'type';
        } else if (vm.barBy == 'country') {
          vm.activeSelector = 'country';
        }
      }).catch(function(err) {
        console.log(err);
      });

    };

    vm.submitBarQuery = function(view, particular) {
      console.log(view, particular);
      var data = {view: view, particular: particular};
      $http.post('/member/bars_numbers', data).then(function(response) {
        console.log(response);
        var computedFp = UserService.computeFootprint(response.data[0]);
        var bars = [];
        bars.push(computedFp.air);
        bars.push(computedFp.truck);
        bars.push(computedFp.sea);
        bars.push(computedFp.freight_train);
        bars.push(computedFp.plane);
        bars.push(computedFp.car);
        bars.push(computedFp.train);
        bars.push(computedFp.hotel);
        bars.push(computedFp.fuel);
        bars.push(computedFp.grid);
        bars.push(computedFp.propane);

        new Chart(document.getElementById("barChart"), {
          type: 'bar',
          data: {
            labels: ['air', 'truck', 'sea', 'freight_train', 'plane', 'car', 'train', 'hotel', 'fuel', 'grid', 'propane'],
            datasets: [{
              //make an array with the sum of all categories
              data: bars,
              label: "CO2",
              borderColor: "#3e95cd",
              fill: false
            }
            ]
          },
          options: {
            title: {
              display: true,
              text: 'Carbon Footprint'
            }
          }
        });
      }).catch(function(err) {
        console.log(err);
      });
    };







//DONUTS:

    vm.viewBy = '';
    vm.viewByObject = {};
    vm.choseProj = false;

//aww jeez but we're also going to have to populate the Particulars select element ....with a GET route.
    vm.changeView = function() {
      console.log(vm.viewBy);
      if (vm.viewBy == 'period') {
        vm.choseProj = false;
        vm.viewByObject.one = 'Project';
        vm.viewByObject.two = 'Type';
        vm.viewByObject.three = 'Country';
        vm.viewByObject.four = 'Category';
      } else if (vm.viewBy == 'project') {
        vm.choseProj = true;
        vm.viewByObject.one = 'Period';
        // vm.viewByObject.two = 'Type';
        // vm.viewByObject.three = 'Country';
        vm.viewByObject.four = 'Category';
      } else if (vm.viewBy == 'country') {
        vm.choseProj = false;
        vm.viewByObject.one = 'Project';
        vm.viewByObject.two = 'Type';
        vm.viewByObject.three = 'Period';
        vm.viewByObject.four = 'Category';
      } else if (vm.viewBy == 'type') {
        vm.choseProj = false;
        vm.viewByObject.one = 'Project';
        vm.viewByObject.two = 'Period';
        vm.viewByObject.three = 'Country';
        vm.viewByObject.four = 'Category';
      } else if (vm.viewBy == 'category') {
        vm.choseProj = false;
        vm.viewByObject.one = 'Project';
        vm.viewByObject.two = 'Type';
        vm.viewByObject.three = 'Country';
        vm.viewByObject.four = 'Period';
      }
    };


    vm.submitQuery = function(view, slice) {
      donutService.getDonut(view, slice).then(function(response) {
        console.log("response: ", response, "vm.viewBy: ", vm.viewBy, "vm.sliceBy: ", vm.sliceBy);

        if (vm.viewBy == 'category') {
          viewByCategory(response.data);
          return;
        }

        if (vm.sliceBy == 'Period') {
          sanitizeByPeriod(response.data);
        } else if (vm.sliceBy == 'Type') {
          sanitizeByType(response.data);
        } else if (vm.sliceBy == 'Country') {
          sanitizeByCountry(response.data);
        } else if (vm.sliceBy == 'Project') {
          sanitizeByProject(response.data);
        } else if (vm.sliceBy == 'Category') {
          sanitizeByCategory(response.data);
        }
      });
    };


//THIS IS UGLY: all five functions should prob be consolidated into one, or at least four of them, excluding categories:
//call if they slice by PERIOD:
//wait I don't know if this makes sense...shouldn't this be a line graph?:
    function sanitizeByPeriod(resp) {
      var allThings = resp;
      var cleanedThings = [];

      //sanitize array of data by collapsing all rows for each period into one row:
      cleanedThings.push(allThings[0]);
      for (var i=1; i<allThings.length; i++) {
        var current = allThings[i];
        var prev = allThings[i - 1];
        if (current.period !== prev.period) {
          cleanedThings.push(current);
        }
      }

      //run the carbon impact calculator for each element of cleanedThings:
      var periods = [];
      for (var j=0; j<cleanedThings.length; j++) {
        periods.push(UserService.computeFootprint(cleanedThings[j]));
      }
      console.log(periods);

      //finally, sum up the columns to find total impact for each period:
      var totals = [], totals_period = [];
      for (var k=0; k<periods.length; k++) {
        var p = periods[k];
        var total = p.air + p.car + p.freight_train + p.fuel + p.grid + p.hotel + p.plane + p.propane + p.sea + p.train + p.truck;
        totals_period.push(p.period);
        totals.push(total);
      }
      console.log(totals);

      var canvas = document.getElementById("donutChart");
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,1000,1000);
      new Chart(document.getElementById("donutChart"), {
        type: 'line',
        data: {
          labels: totals_period,
          datasets: [{
            //make an array with the sum of all categories
            data: totals,
            label: "CO2",
            borderColor: "#3e95cd",
            fill: false
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Carbon Footprint'
          }
        }
      });
    }


//call if they slice by PROJECT:
    function sanitizeByProject(resp) {
      var allThings = resp;
      console.log(resp);

      //sanitize the data, collapsing all rows corresponding to a project into one row:
      var cleanedThings = [];
      cleanedThings.push(allThings[0]);
      for (var i=1; i<allThings.length; i++) {
        var current = allThings[i];
        var prev = allThings[i - 1];
        if (current.name !== prev.name) {
          cleanedThings.push(current);
        }
      }
      console.log(cleanedThings);

      //run the carbon impact calculator on each project's data:
      var projects = [];
      for (var j=0; j<cleanedThings.length; j++) {
        projects.push(UserService.computeFootprint(cleanedThings[j]));
      }
      console.log(projects);

      //finally, sum up all the columns to find total footprint of each project:
      var totals = [], totals_name = [];
      for (var k=0; k<projects.length; k++) {
        var p = projects[k];
        var total = p.air + p.car + p.freight_train + p.fuel + p.grid + p.hotel + p.plane + p.propane + p.sea + p.train + p.truck;
        totals_name.push(p.name);
        totals.push(total);
      }
      console.log(totals);

      //the issue here is their array of projects will be indefinitely long: how do we set data equal to the proper array? Oh i guess we can split "totals" into two arrays for data and for labels.

      var canvas = document.getElementById("donutChart");
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,1000,1000);
      new Chart(document.getElementById("donutChart"), {
        type: 'doughnut',
        data: {
          labels: totals_name,
          datasets: [
            {
              label: "CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: totals
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint'
          }
        }
      });

    }


//call if they slice by TYPE:
    function sanitizeByType(resp) {
      var allThings = resp;
      var cleanedThings = [];
      //sanitize array of data by collapsing all rows for each type into one row:
      cleanedThings.push(allThings[0]);
      for (var i=1; i<allThings.length; i++) {
        var current = allThings[i];
        var prev = allThings[i - 1];
        if (current.type_id !== prev.type_id) {
          cleanedThings.push(current);
        }
      }
      console.log(cleanedThings);
      //calculate carbon impact for each element of cleaned array:
      var types = [];
      for (var j=0; j<cleanedThings.length; j++) {
        types.push(UserService.computeFootprint(cleanedThings[j]));
      }
      console.log(types);

      //finally, add up all columns to find total footprint for each type:
      var totals = [], totals_type = [];
      for (var k=0; k<types.length; k++) {
        var t = types[k];
        var total = t.air + t.car + t.freight_train + t.fuel + t.grid + t.hotel + t.plane + t.propane + t.sea + t.train + t.truck;
        totals.push(total);
        totals_type.push(t.type_id);
      }
      console.log(totals);

      var canvas = document.getElementById("donutChart");
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,1000,1000);
      new Chart(document.getElementById("donutChart"), {
        type: 'doughnut',
        data: {
          labels: totals_type,
          datasets: [
            {
              label: "CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: totals
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint'
          }
        }
      });
    }


//call if they slice by COUNTRY:
    function sanitizeByCountry(resp) {
      var allThings = resp;
      var cleanedThings = [];

      //sanitize the array of data by collating all rows for a particular country into one row:
      cleanedThings.push(allThings[0]);
      for (var i=1; i<allThings.length; i++) {
        var current = allThings[i];
        var prev = allThings[i - 1];
        if (current.country_id !== prev.country_id) {
          cleanedThings.push(current);
        }
      }
      //run the carbon impact calculator for each country:
      var countries = [];
      for (var j=0; j<cleanedThings.length; j++) {
        countries.push(UserService.computeFootprint(cleanedThings[j]));
      }
      console.log(countries);

      //finally, sum up all the columns to find each country's total impact:
      var totals = [], totals_country = [];
      for (var k=0; k<countries.length; k++) {
        var t = countries[k];
        var total = t.air + t.car + t.freight_train + t.fuel + t.grid + t.hotel + t.plane + t.propane + t.sea + t.train + t.truck;
        totals.push(total);
        totals_country.push(t.country_id);
      }
      console.log(totals);

      var canvas = document.getElementById("donutChart");
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,1000,1000);
      new Chart(document.getElementById("donutChart"), {
        type: 'doughnut',
        data: {
          labels: totals_country,
          datasets: [
            {
              label: "CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: totals
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint'
          }
        }
      });

    }


//call if they slice by CATEGORY:
    function sanitizeByCategory(resp) {
      console.log(resp);
      // console.log("viewBy: ", vm.viewBy, "object: ", vm.viewByObject);

      var fp = UserService.computeFootprint(resp[0]);
      console.log(fp);

      //calculate totals:
      var totals = [];
      var living = fp.fuel + fp.hotel + fp.grid + fp.propane;
      var shipping = fp.air + fp.truck + fp.sea + fp.freight_train;
      var travel = fp.plane + fp.train + fp.car;

      totals.push(living);
      totals.push(shipping);
      totals.push(travel);
      console.log("totals: ", totals);

      var canvas = document.getElementById("donutChart");
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0,0,1000,1000);
      new Chart(document.getElementById("donutChart"), {
        type: 'doughnut',
        data: {
          labels: ["Living", "Travel", "Shipping"],
          datasets: [
            {
              label: "CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [living, travel, shipping]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint'
          }
        }
      });

    }

  //call if they view by CATEGORY:
  //no there has to be a better way to do this....it's just ALL their footprints.
    function viewByCategory(resp) {
      console.log(resp);

      var x = 'shipping';

      //set all NON-shipping (e.g.) columns to 0:
      for (var i=0; i<resp.length; i++) {
        var r = resp[i];
        if (x == 'living') {
          r.air=0;
          r.truck=0;
          r.sea=0;
          r.freight_train=0;
          r.plane=0;
          r.train=0;
          r.car=0;
        } else if (x == 'shipping') {
          r.fuel=0;
          r.hotel=0;
          r.grid=0;
          r.propane=0;
          r.plane=0;
          r.train=0;
          r.car=0;
        } else if (x == 'travel') {
          r.fuel=0;
          r.hotel=0;
          r.grid=0;
          r.propane=0;
          r.air=0;
          r.truck=0;
          r.sea=0;
          r.freight_train=0;
        }
      }

      //send the curated array through the proper sliceBy function:
      if (vm.sliceBy == 'Period') {
        sanitizeByPeriod(resp);
      } else if (vm.sliceBy == 'Type') {
        sanitizeByType(resp);
      } else if (vm.sliceBy == 'Country') {
        sanitizeByCountry(resp);
      } else if (vm.sliceBy == 'Project') {
        sanitizeByProject(resp);
      }
    }



}); //End login controller
