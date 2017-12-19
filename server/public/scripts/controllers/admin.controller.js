myApp.controller('AdminController', function (UserService) {
    console.log('AdminController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
   

    

   


});