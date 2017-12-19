myApp.controller('AdminController', function (UserService) {
    console.log('AdminController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;
    vm.userProjects = UserService.userProjects;
    vm.allUsers = UserService.users;
   
    gettingUsers = function(){
        UserService.adminGetUsers().then(function(response){
            vm.allUsers = UserService.users;
        })
    }
    
    gettingUsers();
    

   


});