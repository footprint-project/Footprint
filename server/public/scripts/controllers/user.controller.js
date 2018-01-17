myApp.controller('UserController', function (UserService, $mdDialog, $http, $filter, donutService, $location) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.countries = UserService.countries.data;
  vm.userProjects = UserService.userProjects;
  vm.selectedIndex = UserService.userProjects.selectedIndex;
  vm.lineData = [];
  vm.sliceBy = 'abc';
  //this is for the list of user projects

  vm.showButton=false;




  // gets the data for the DASHBOARD lineChart displaying org's carbon impact
  vm.lineChart = function () {
    donutService.getUserFpDividedByPeriod().then(function (response) {
      vm.lineData = response;
      var month = '';
      var sum = 0;

      var periodArray = [];
      var sumsArray = [];
      for (var i = 0; i < vm.lineData.length; i += 1) {
        lineData = vm.lineData[i];
        sum = lineData.air + lineData.car + lineData.freight_train + lineData.fuel + lineData.grid + lineData.hotel + lineData.plane + lineData.propane + lineData.sea + lineData.train + lineData.truck;
        sumsArray.push(Math.round(sum, 1));

        month = $filter('date')(vm.lineData[i].period, 'MMM yyyy');

        periodArray.push(month);

      }

      new Chart(document.getElementById("linechart"), {
        type: 'line',
        data: {
          labels: periodArray,
          datasets: [{
            //make an array with the sum of all categories
            data: sumsArray,
            label: "Kgs of CO₂",
            borderColor: "#3e95cd",
            fill: false
          }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Carbon Footprint over Time'
          }
        }
      });
    }).catch(function (error) {
      console.log(error, 'error with line graph data footprints by period');
    });
  };


  //gets users projects
  vm.userService.getProjects(vm.userObject.id);
  //dashboard dialog
  vm.upload = function (ev, i) {
    // userService.getProjects.selectedIndex = i;



    $mdDialog.show({
      controller: 'DashboardDialogController as ddc',
      templateUrl: 'views/templates/dashboarddialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true

    });
  }; //End modal function

  //Add new project modal.
  vm.newProject = function (ev, i) {

    $mdDialog.show({
      controller: 'ProjectDialogController as pdc',
      templateUrl: 'views/templates/projectdialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true

    });
  };

  vm.hide = function () {
    $mdDialog.hide();
  };

  vm.cancel = function () {
    $mdDialog.cancel();
  };

  vm.answer = function (answer) {

    $mdDialog.hide(answer);
  };

  vm.showProject = function (ev, i) {
    UserService.userProjects.selectedIndex = i;

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

      vm.barResults = response.data;

      //ty Chrisco:
      vm.activeSelector = vm.barBy;

    }).catch(function(err) {
      console.log(err);
    });

  };

  vm.submitBarQuery = function(view, particular) {

    var data = {view: view, particular: particular};
    $http.post('/member/bars_numbers', data).then(function(response) {

      var computedFp = UserService.computeFootprint(response.data[0]);
      var bars = [];
      bars.push(Math.round(computedFp.air,1));
      bars.push(Math.round(computedFp.truck,1));
      bars.push(Math.round(computedFp.sea,1));
      bars.push(Math.round(computedFp.freight_train, 1));
      bars.push(Math.round(computedFp.plane, 1));
      bars.push(Math.round(computedFp.car, 1));
      bars.push(Math.round(computedFp.train, 1));
      bars.push(Math.round(computedFp.hotel, 1));
      bars.push(Math.round(computedFp.fuel, 1));
      bars.push(Math.round(computedFp.grid, 1));
      bars.push(Math.round(computedFp.propane, 1));
      var canvas = document.getElementById("barChart");


      new Chart(document.getElementById("barChart"), {
        type: 'bar',
        data: {
          labels: ['air', 'truck', 'sea', 'freight train', 'plane', 'car', 'train', 'hotel', 'fuel', 'grid', 'propane'],
          datasets: [{
            //make an array with the sum of all categories
            data: bars,
            label: "Kgs of CO₂",
            borderColor: "#3e95cd",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
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
vm.activeSelectorDonut = '';
vm.donutResults = [];
vm.donutParticular = {};

//aww jeez but we're also going to have to populate the Particulars select element ....with a GET route.
vm.changeView = function() {

  if (vm.viewBy == 'period') {
    vm.choseProj = false;
    vm.viewByObject.one = 'Project';
    vm.viewByObject.two = 'Type';
    vm.viewByObject.three = 'Country';
    vm.viewByObject.four = 'Category';
    vm.activeSelectorDonut = 'period';
  } else if (vm.viewBy == 'project') {
    vm.choseProj = true;
    vm.viewByObject.one = 'Period';

    vm.viewByObject.four = 'Category';
    vm.activeSelectorDonut = 'project';
  } else if (vm.viewBy == 'country') {
    vm.choseProj = false;
    vm.viewByObject.one = 'Project';
    vm.viewByObject.two = 'Type';
    vm.viewByObject.three = 'Period';
    vm.viewByObject.four = 'Category';
    vm.activeSelectorDonut = 'country';
  } else if (vm.viewBy == 'type') {
    vm.choseProj = false;
    vm.viewByObject.one = 'Project';
    vm.viewByObject.two = 'Period';
    vm.viewByObject.three = 'Country';
    vm.viewByObject.four = 'Category';
    vm.activeSelectorDonut = 'type';
  } else if (vm.viewBy == 'category') {
    vm.choseProj = false;
    vm.viewByObject.one = 'Project';
    vm.viewByObject.two = 'Type';
    vm.viewByObject.three = 'Country';
    vm.viewByObject.four = 'Period';
    vm.activeSelectorDonut = 'category';
  }

  var data = {view: vm.viewBy};
  if (vm.activeSelectorDonut != 'category') {
  $http.post('member/bars', data).then(function(response) {

    vm.donutResults = response.data;
  }).catch(function(err) {
    console.log(err);
  });
}
};


vm.submitQuery = function(view, particular, slice) {
  donutService.getDonut(view, particular, slice).then(function(response) {
    // console.log("response: ", response, "vm.viewBy: ", vm.viewBy, "vm.sliceBy: ", vm.sliceBy, "vm.particular: ", vm.donutParticular);

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


var chart1, chart2, chart3, chart4, chart5;

//call if they slice by PERIOD:
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


  //finally, sum up the columns to find total impact for each period:
  var totals = [], totals_period = [];
  for (var k=0; k<periods.length; k++) {
    var p = periods[k];
    var total = p.air + p.car + p.freight_train + p.fuel + p.grid + p.hotel + p.plane + p.propane + p.sea + p.train + p.truck;
    totals_period.push($filter('date')(p.period, 'MMM yyyy'));
    totals.push(Math.round(total, 1));
  }



  //well we don't need the following 2 declarations, and we get a weird error, but it does fix the hover bug!:
  var canvas = angular.element(document.getElementById("donutChart"));
  canvas.remove();
  var canvasContainer = angular.element(document.querySelector("#donutChartContainer"));
  canvasContainer.append("<canvas id='donutChart' height=225 width=400></canvas>");

  if (chart1) {
    chart1.destroy();
  } else if (chart2) {
    chart2.destroy();
  } else if (chart3) {
    chart3.destroy();
  } else if (chart4) {
    chart4.destroy();
  } else if (chart5) {
    chart5.destroy();
  }

  chart1= new Chart(document.getElementById("donutChart").getContext("2d"), {
    type: 'line',
    data: {
      labels: totals_period,
      datasets: [{
        //make an array with the sum of all categories
        data: totals,
        label: "Kgs of CO₂",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Carbon Footprint Over Time'
    }
  }
});
}


//call if they slice by PROJECT:
function sanitizeByProject(resp) {
  var allThings = resp;


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


  //run the carbon impact calculator on each project's data:
  var projects = [];
  for (var j=0; j<cleanedThings.length; j++) {
    projects.push(UserService.computeFootprint(cleanedThings[j]));
  }


  //finally, sum up all the columns to find total footprint of each project:
  var totals = [], totals_name = [];
  for (var k=0; k<projects.length; k++) {
    var p = projects[k];
    var total = p.air + p.car + p.freight_train + p.fuel + p.grid + p.hotel + p.plane + p.propane + p.sea + p.train + p.truck;
    totals_name.push(p.name);
    totals.push(Math.round(total,1));
  }
  //the issue here is their array of projects will be indefinitely long: how do we set data equal to the proper array? Oh i guess we can split "totals" into two arrays for data and for labels.

  if (chart1) {
    chart1.destroy();
  } else if (chart2) {
    chart2.destroy();
  } else if (chart3) {
    chart3.destroy();
  } else if (chart4) {
    chart4.destroy();
  } else if (chart5) {
    chart5.destroy();
  }
  var canvas = angular.element(document.getElementById("donutChart"));
  canvas.remove();
  var canvasContainer = angular.element(document.querySelector("#donutChartContainer"));
  canvasContainer.append("<canvas id='donutChart' height=225 width=400></canvas>");
  chart2= new Chart(document.getElementById("donutChart").getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: totals_name,
      datasets: [
        {
          label: "CO2",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
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
  //calculate carbon impact for each element of cleaned array:
  var types = [];
  for (var j=0; j<cleanedThings.length; j++) {
    types.push(UserService.computeFootprint(cleanedThings[j]));
  }

  //finally, add up all columns to find total footprint for each type:
  var totals = [], totals_type = [];
  for (var k=0; k<types.length; k++) {
    var t = types[k];
    var total = t.air + t.car + t.freight_train + t.fuel + t.grid + t.hotel + t.plane + t.propane + t.sea + t.train + t.truck;
    totals.push(Math.round(total,1));
    totals_type.push(t.type_id);
  }


  if (chart1) {
    chart1.destroy();
  } else if (chart2) {
    chart2.destroy();
  } else if (chart3) {
    chart3.destroy();
  } else if (chart4) {
    chart4.destroy();
  } else if (chart5) {
    chart5.destroy();
  }
  var canvas = angular.element(document.getElementById("donutChart"));
  canvas.remove();
  var canvasContainer = angular.element(document.querySelector("#donutChartContainer"));
  canvasContainer.append("<canvas id='donutChart' height=225 width=400></canvas>");
  chart3=new Chart(document.getElementById("donutChart").getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: totals_type,
      datasets: [
        {
          label: "CO2",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
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


  //finally, sum up all the columns to find each country's total impact:
  var totals = [], totals_country = [];
  for (var k=0; k<countries.length; k++) {
    var t = countries[k];
    var total = t.air + t.car + t.freight_train + t.fuel + t.grid + t.hotel + t.plane + t.propane + t.sea + t.train + t.truck;
    totals.push(Math.round(total,1));
    totals_country.push(t.country_id);
  }


  if (chart1) {
    chart1.destroy();
  } else if (chart2) {
    chart2.destroy();
  } else if (chart3) {
    chart3.destroy();
  } else if (chart4) {
    chart4.destroy();
  } else if (chart5) {
    chart5.destroy();
  }
  var canvas = angular.element(document.getElementById("donutChart"));
  canvas.remove();
  var canvasContainer = angular.element(document.querySelector("#donutChartContainer"));
  canvasContainer.append("<canvas id='donutChart' height=225 width=400></canvas>");
  chart4 = new Chart(document.getElementById("donutChart").getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: totals_country,
      datasets: [
        {
          label: "CO2",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
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



  var fp = UserService.computeFootprint(resp[0]);


  //calculate totals:
  var totals = [];
  var living = fp.fuel + fp.hotel + fp.grid + fp.propane;
  var shipping = fp.air + fp.truck + fp.sea + fp.freight_train;
  var travel = fp.plane + fp.train + fp.car;

  totals.push(Math.round(living, 1));
  totals.push(Math.round(shipping, 1));
  totals.push(Math.round(travel, 1));


  if (chart1) {
    chart1.destroy();
  } else if (chart2) {
    chart2.destroy();
  } else if (chart3) {
    chart3.destroy();
  } else if (chart4) {
    chart4.destroy();
  } else if (chart5) {
    chart5.destroy();
  }
  var canvas = angular.element(document.getElementById("donutChart"));
  canvas.remove();
  var canvasContainer = angular.element(document.querySelector("#donutChartContainer"));
  canvasContainer.append("<canvas id='donutChart' height=225 width=400></canvas>");

  chart5 = new Chart(document.getElementById("donutChart").getContext("2d"), {
    type: 'doughnut',
    data: {
      labels: ["Living", "Travel", "Shipping"],
      datasets: [
        {
          label: "CO2",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#5F61D6", "#D6EDFF", "#D6D659", "#D7BDF2", "#89896B", "#C8931E"],
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


  vm.lineChart();


  vm.checkAdmin = function(){
    if(vm.userObject.id === 1){
      vm.showButton = true;
    }
  }

vm.checkAdmin();

  vm.navigate = function(){
    $location.path('/admin');
  }


});
//end of user controller
