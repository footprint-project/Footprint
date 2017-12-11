myApp.controller('LoginController', function ($http, $location, $timeout, UserService) {
    console.log('LoginController created');
    var vm = this;
    vm.user = {
      username: '',
      password: ''
    };
    vm.message = '';

  vm.uploadFile = function () {
    console.log('clicked upload');
    var f = document.getElementById('file').files[0];
    var r = new FileReader();
    r.onloadend = function (e) {
      var data = e.target.result;
      console.log(data);
    };
    r.readAsBinaryString(f);
    console.log(r);
  };

// });
    
  // app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    // vm.uploadFile = function (file, errFiles) {
    //   console.log('clicked upload');
    //   vm.f = file;
    //   vm.errFile = errFiles && errFiles[0];
    //   if (file) {
    //     file.upload = Upload.upload({
    //       url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
    //       data: { file: file }
    //     });

    //     file.upload.then(function (response) {
    //       $timeout(function () {
    //         file.result = response.data;
    //       });
    //     }, function (response) {
    //       if (response.status > 0)
    //         vm.errorMsg = response.status + ': ' + response.data;
    //     }, function (evt) {
    //       file.progress = Math.min(100, parseInt(100.0 *
    //         evt.loaded / evt.total));
    //     });
    //   }
    // }
  // });
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
});
