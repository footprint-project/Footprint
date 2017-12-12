myApp.controller('UserController', function(UserService) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  //this is for the list of user projects
  vm.userService.getProjects(vm.userObject.id);
});
