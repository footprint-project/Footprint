myApp.controller('DashboardDialogController', function (UserService, $mdDialog) {
    console.log('DashboardDialogController created');
    var vm = this;
    vm.userService = UserService;
    vm.userObject = UserService.userObject;
    vm.countries = UserService.countries.data;

});