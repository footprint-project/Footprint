myApp.controller('AdminController', function (UserService) {
    console.log('AdminController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.allUsers = UserService.users;
   
    // this gets all the registered users
    gettingUsers = function(){
        UserService.adminGetUsers().then(function(response){
            vm.allUsers = response;
            console.log(response);
        }).catch(function (error) {
            console.log(error, 'error getting all users');
        });
    }
    
    //for page load, is displayed on DOM
    gettingUsers();
    
});