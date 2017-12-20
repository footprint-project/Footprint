myApp.controller('UserController', function (UserService, $mdDialog, $http, $filter, donutService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.countries = UserService.countries.data;
  vm.userProjects = UserService.userProjects;
  vm.selectedIndex = UserService.userProjects.selectedIndex;
  vm.lineData = [];
  //this is for the list of user projects



// // Bar chart
//   new Chart(document.getElementById("bar-chart"), {
//     type: 'bar',
//     data: {
//       labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
//       datasets: [
//         {
//           label: "Population (millions)",
//           backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
//           data: [2478, 5267, 734, 784, 433]
//         }
//       ]
//     },
//     options: {
//       legend: { display: false },
//       title: {
//         display: true,
//         text: 'Predicted world population (millions) in 2050'
//       }
//     }
//   });
  // gets the data for the DASHBOARD lineChart displaying org's carbon impact
  vm.lineChart = function () {
    donutService.getFpDividedByPeriod(vm.userObject.id).then(function (response) {
      vm.lineData = response;
      var month = '';
      var sum = 0;
      console.log(vm.lineData);
      var periodArray = [];
      var sumsArray = [];
      for (var i = 0; i < vm.lineData.length; i += 1) {
        lineData = vm.lineData[i];
        sum = lineData.air + lineData.car + lineData.freight_train + lineData.fuel + lineData.grid + lineData.hotel + lineData.plane + lineData.propane + lineData.sea + lineData.train + lineData.truck;
        sumsArray.push(sum);
        console.log(sumsArray);
        month = $filter('date')(vm.lineData[i].period, 'MMM yy');
        console.log(month);
        periodArray.push(month);
        // console.log(periodArray);
      }
      new Chart(document.getElementById("linechart"), {
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
//gets users projects
  vm.userService.getProjects(vm.userObject.id);
  //dashboard dialog
  vm.upload = function (ev, i) {
    // userService.getProjects.selectedIndex = i;
    console.log('Clicked showMore', i);


    $mdDialog.show({
      controller: 'DashboardDialogController as ddc',
      templateUrl: 'views/templates/dashboarddialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true

    })
  } //End modal function

  //Add new project modal.
  vm.newProject = function (ev, i) {
    console.log('clicked create project modal');
    $mdDialog.show({
      controller: 'ProjectDialogController as pdc',
      templateUrl: 'views/templates/projectdialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true

    })
  }

  vm.hide = function () {
    $mdDialog.hide();
  };

  vm.cancel = function () {
    $mdDialog.cancel();
  };

  vm.answer = function (answer) {
    console.log(answer);
    $mdDialog.hide(answer);
  };

  vm.showProject = function (ev, i) {
    UserService.userProjects.selectedIndex = i;
    console.log('clicked showProject', i);
    UserService.clickedProject = UserService.userProjects[i];
    window.location.href = '/#/projects';
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





});
//end of user controller
