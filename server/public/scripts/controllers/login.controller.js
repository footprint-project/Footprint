 myApp.controller('LoginController', function ($http, $location, $timeout, UserService, donutService, csvService) {

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

  vm.lineChart = function(){
    donutService.getFpDividedByPeriod().then(function(response){
      vm.lineData = response;
      var month = '';
      var sum = 0;
      console.log(vm.lineData);
      var periodArray = [];
      var sumsArray = [];
      for (var i=0; i<vm.lineData.length; i+=1){
        sum = vm.lineData[i].air + vm.lineData[i].car + vm.lineData[i].freight_train + vm.lineData[i].fuel + vm.lineData[i].grid + vm.lineData[i].hotel + vm.lineData[i].plane + vm.lineData[i].propane + vm.lineData[i].sea + vm.lineData[i].train + vm.lineData[i].truck;
        sumsArray.push(sum);
        console.log(sumsArray);
        if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 01){
          month = 'Jan'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 02) {
          month = 'Feb'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 03) {
          month = 'Mar'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 04) {
          month = 'Apr'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 05) {
          month = 'May'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 06) {
          month = 'Jun'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 07) {
          month = 'Jul'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 08) {
          month = 'Aug'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 09) {
          month = 'Sep'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 10) {
          month = 'Oct'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 11) {
          month = 'Nov'
        }
        else if (vm.lineData[i].period[5] + vm.lineData[i].period[6] == 12) {
          month = 'Dec'
        }
        console.log(month);
        periodArray.push(month);
        console.log(periodArray);
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
    });
  }
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
            vm.message = "Wrong!!";
          }
        }).catch(function(response){
          console.log('LoginController -- registerUser -- failure: ', response);
          vm.message = "Wrong!!";
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

    vm.dataType = function(data){
      console.log(data);
      csvService.dataType = data;
    }

}); //End login controller
