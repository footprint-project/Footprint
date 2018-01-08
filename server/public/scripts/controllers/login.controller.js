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
  

    //this is called in the lineChart function, not sure why it's called here...
   //donutService.getFpDividedByPeriod(1);

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
              label: "Kgs of CO2",
              backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
              data: [Math.round(vm.donutResult.living, 1), Math.round(vm.donutResult.travel, 1), Math.round(vm.donutResult.shipping,1)]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total Footprint by Category'
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
            label: "Kgs of CO2",
            backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
            data: [Math.round(vm.donutResult.living, 1), Math.round(vm.donutResult.travel, 1), Math.round(vm.donutResult.shipping, 1)]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Total Kgs of CO2 by Category'
        }
      }
    });
  });
  };


  vm.donutDataSet();

  // gets the data for the landing page lineChart displaying footprints carbon impact
  vm.lineChart = function(){
    donutService.getFpDividedByPeriod(1).then(function(response){
      vm.lineData = response;
      var month = '';
      var sum = 0;
      console.log(vm.lineData);
      var periodArray = [];
      var sumsArray = [];
      for (var i=0; i<vm.lineData.length; i+=1){
        lineData = vm.lineData[i];
        sum = lineData.air + lineData.car + lineData.freight_train + lineData.fuel + lineData.grid + lineData.hotel + lineData.plane + lineData.propane + lineData.sea + lineData.train + lineData.truck;
        sumsArray.push(Math.round(sum,1));
        //console.log(sumsArray);
        month = $filter('date')(vm.lineData[i].period, 'MMM yyyy');
       // console.log(month);
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
            label: "Kgs of CO2",
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
            if (response.data.id != 1){
            $location.path('/user'); // http://localhost:5000/#/user
            } else {
              $location.path('/admin');
            }
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



}); //End login controller
