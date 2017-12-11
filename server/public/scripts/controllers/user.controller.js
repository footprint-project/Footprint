myApp.controller('UserController', function(UserService, fileUpload) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;





      vm.uploadFile = function(){
         var file = vm.myFile;

         console.log('file is ' );
         console.dir(file);

         var uploadUrl = "/fileUpload";
         fileUpload.uploadFileToUrl(file, uploadUrl);
      };


});
