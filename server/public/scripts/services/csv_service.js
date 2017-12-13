myApp.service('csvService', function($http, $location){
  console.log('csvService Loaded');

  var vm = this;
  vm.userFootprint = {userInfo: [], userType: [], data: [] };

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

//This data parses the data from uploaded CSVs.
  vm.parseData = function(data) {
    console.log(data);

    var dataNums = data.slice(data.lastIndexOf('kWh'), data.indexOf(',,,,,,,,,,'));
      //  console.log(dataNums);

      var arrayOfNums = dataNums.split(',');
      console.log(arrayOfNums);

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
          console.log(num);
          // var newNum = num.slice(0, num.length - 2);
          // console.log(newNum);
          csv.propane += Number(num);
        }
        
      }
      console.log(csv)
      vm.valuesToArray(csv);
  };

  vm.valuesToArray = function(obj) {
    var result = [];
    for (var key in obj) {
       if (obj.hasOwnProperty(key)) {
           result.push(obj[key]);
       }
    }
    vm.calculations(result);
}

  //  This function will calculate carbon footprint data
  vm.calculations = function(result) {
    // console.log('Test:', result[0]);
    for (var i=0; i<result.length; i++) {
      result.plane = (result[0] * .18026);
      result.car= (result[1] * .18568);
      result.train_travel = (result[2] * .01225);
      result.air = (result[3] * 31.1);
      result.train_shipping = (result[4] * 2.60016271124822);
      result.truck = (result[5] * 0.35156);
      result.sea = (result[6] * 0.186455554041745);
      result.hotel = (result[7] * 1.45648);
      result.fuel = (result[8] * 0.10559);
      result.grid = (result[9] * 0.008979 );
    }
    vm.userFootprint.data = result;
      console.log(vm.userFootprint.data);
  }

  vm.userData = function(user){
   
   vm.userFootprint.userInfo = user;
   console.log(vm.userFootprint.userInfo);
  }

  vm.typeData = function(sendData){
    vm.userFootprint.userType = sendData;
    console.log(vm.userFootprint.userType);
  }

}); //End CSV service.