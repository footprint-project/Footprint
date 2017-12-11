myApp.service('csvService', function($http, $location){
  console.log('csvService Loaded');

  var vm = this;

<<<<<<< HEAD
=======

>>>>>>> 8496e9f80f9a6f1c47cd7dcb8816846a83b54ba6
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

  vm.parseData = function(data) {
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
  };

});
