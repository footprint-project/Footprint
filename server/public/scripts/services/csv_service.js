myApp.service('csvService', function($http, $location, UserService){
  console.log('csvService Loaded');

  var vm = this;
  vm.userFootprint = {userInfo: [], userType: [], dataIn: [] };

  var csv = {
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

vm.dataType;

//This function parses the data from uploaded CSVs.
  vm.parseData = function(data) {
    console.log(data);

    var dataNums = data.slice(data.lastIndexOf('kWh'), data.indexOf(',,,,,,,,,,'));
      //  console.log(dataNums);

      var arrayOfNums = dataNums.split(',');
      console.log(arrayOfNums);

      //a switch statement would be cleaner here....if anyone is feeling motivated:
      for (var i=0; i<arrayOfNums.length; i++) {
        var num = arrayOfNums[i];
        if (i % 11 == 1 && num !== '') {
          csv.plane += Number(num);
        } else if (i % 11 == 2 && num !== '') {
          csv.car += Number(num);
        } else if (i % 11 == 3 && num !== '') {
          csv.train_travel += Number(num);
        } else if (i % 11 == 4 && num !== '') {
          csv.air += Number(num);
        } else if (i % 11 == 5 && num !== '') {
          csv.train_shipping += Number(num);
        } else if (i % 11 == 6 && num !== '') {
          csv.truck += Number(num);
        } else if (i % 11 == 7 && num !== '') {
          csv.sea += Number(num);
        } else if (i % 11 == 8 && num !== '') {
          csv.hotel += Number(num);
        } else if (i % 11 == 9 && num !== '') {
          csv.fuel += Number(num);
        } else if (i % 11 == 10 && num !== '') {
          csv.grid += Number(num);
        } else if (i % 11 == 0 && num !== '' && i>1) {
          csv.propane += Number(num);
        }

      }
      
      console.log(csv);
      //  console.log(vm.dataType.type);
      // if (vm.dataType.type === 'English'){
      //   for (var i=0; i<csv.length; i++){
      //     csv.plane = (csv.plane * 1.609344);
      //     csv.car = (csv.plane * 1.609344);
      //     csv.train_travel = (csv.plane * 1.609344);
      //     csv.air = (csv.air * 1.460);
      //     csv.train_shipping = (csv.train_travel * 1.460);
      //     csv.truck = (csv.truck * 1.460);
      //     csv.sea = (csv.sea * 1.460);
      //     console.log('Post English conversion,' + csv)
      //   }
      // }
      vm.valuesToArray(csv);

      vm.trialData = UserService.computeTrialFootprint(csv);

      return $http.post('/admin', csv).then(function(response) {
        console.log('here you go!', csv);
        csv = {
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

        return vm.trialData;
        //how odd that it logs out all as 0s here but posts into the DB ok....asynchonicity man.
      }).catch(function (err) {
        console.log('whooooops');
      });


  };

  vm.valuesToArray = function(obj) {
    var result = [];
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key]);
       }
    }
    console.log(vm.dataType.type);
    if (vm.dataType.type === 'English'){
      for (var i=0; i<result.length; i++){
        result.plane = (result.plane * 1.609344);
        result.car = (result.plane * 1.609344);
        result.train_travel = (result.plane * 1.609344);
        result.air = (result.air * 1.460);
        result.train_shipping = (result.train_travel * 1.460);
        result.truck = (result.truck * 1.460);
        result.sea = (result.sea * 1.460);
      }
      console.log('Post English conversion,' + result);
    }
    console.log(result);
    vm.calculations(result);
};

  //  This function will calculate carbon footprint data
  vm.calculations = function(result) {
    // console.log('Test:', result[0]);
    for (var i=0; i<result.length; i++) {
      result.plane = (result[0] * 0.18026);
      result.car= (result[1] * 0.18568);
      result.train_travel = (result[2] * 0.01225);
      result.air = (result[3] * 1.45648);
      result.train_shipping = (result[4] * 2.60016271124822); //This needs to be updated
      result.truck = (result[5] * 0.10559);
      result.sea = (result[6] * 0.008979 );
      result.hotel = (result[7] * 31.1);
      result.fuel = (result[8] * 2.60016271124822);
      result.grid = (result[9] * 0.35156 );
      result.propane = (result[10] * 0.186455554041745);
      result.totals = (result.plane + result.car + result.train_travel + result.air + result.train_shipping + result.truck + result.sea + result.hotel + result.fuel + result.grid + result.propane)
    }
    var footprintIn = vm.userFootprint.dataIn;
    footprintIn.push({plane: result.plane}, {car: result.car}, {train_travel: result.train_travel}, {air: result.air}, {train_shipping: result.train_shipping}, {truck: result.truck}, {sea: result.sea}, {hotel: result.hotel}, {fuel: result.fuel}, {grid: result.grid}, {propane: result.propane}, {total: result.totals});
    // vm.userFootprint.dataIn.push(result.plane);
      console.log(result);
  }

  vm.userData = function(user){
   console.log(user);
   vm.userFootprint.userInfo.push({selectedOrganization: user.selectedOrganization});
   console.log(vm.userFootprint.userInfo);
  }

  vm.typeData = function(sendData){
    vm.userFootprint.userType = sendData;
    console.log(vm.userFootprint.userType);
  }

  //This is the start of sending logged in user's info to the database.
  vm.projectOut = {userInfo: [], userType: [], dataIn: [] }

  vm.parseFootprint = function(data){
      console.log(data);
  
      var dataNums = data.slice(data.lastIndexOf('kWh'), data.indexOf(',,,,,,,,,,'));
        //  console.log(dataNums);
  
        var arrayOfNums = dataNums.split(',');
        console.log(arrayOfNums);

        var csvIn = {
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
  
        for (var i=0; i<arrayOfNums.length; i++) {
          var num = arrayOfNums[i];
          if (i % 11 == 1 && num !== '') {
            csvIn.plane += Number(num);
          } else if (i % 11 == 2 && num !== '') {
            csvIn.car += Number(num);
          } else if (i % 11 == 3 && num !== '') {
            csvIn.train_travel += Number(num);
          } else if (i % 11 == 4 && num !== '') {
            csvIn.air += Number(num);
          } else if (i % 11 == 5 && num !== '') {
            csvIn.train_shipping += Number(num);
          } else if (i % 11 == 6 && num !== '') {
            csvIn.truck += Number(num);
          } else if (i % 11 == 7 && num !== '') {
            csvIn.sea += Number(num);
          } else if (i % 11 == 8 && num !== '') {
            csvIn.hotel += Number(num);
          } else if (i % 11 == 9 && num !== '') {
            csvIn.fuel += Number(num);
          } else if (i % 11 == 10 && num !== '') {
            csvIn.grid += Number(num);
          } else if (i % 11 == 0 && num !== '' && i>1) {
            csvIn.propane += Number(num);
          }
  
        }
        // console.log(csv);
        // vm.valuesToArray(csv);
        var footprintIn = vm.projectOut.dataIn;
        footprintIn.push(csvIn);
        console.log(vm.projectOut.dataIn);
        csvIn = {
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
        vm.postProjects();
  }

  vm.sendUser = function(user){
    console.log(user);
    vm.projectOut.userInfo.push({selectedCountry: user.selectedCountry}, {selectedMonth: user.selectedMonth}, {selectedYear: user.selectedYear}, {project: user.projectName});
  }

  vm.projectChecks = function(sendData){
    vm.projectOut.userType = sendData;
    console.log(vm.projectOut.userType);
    } //End project function

 vm.postProjects = function(){
  console.log(vm.projectOut);
  $http.post('/member/project_submit', vm.projectOut).then(function(response){
  console.log('project sent', response)
  }).catch(function(error){
    console.log('error adding projects', error)
  })
 }
     
  



}); //End CSV service.
