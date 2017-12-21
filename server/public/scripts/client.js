var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngFileUpload']);
var uploadApp = angular.module('fileUpload', ['ngFileUpload']);
/// Routes ///
myApp.config(function($routeProvider, $locationProvider, $mdThemingProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/dashboard.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/projects', {
      templateUrl: '/views/templates/projects.html',
      controller: 'ProjectController as pc',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController as ac',
      resolve: {
        getuser: function (UserService) {
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });

  $mdThemingProvider.theme('default')
    .primaryPalette('teal', {
      'default': '100', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '200', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    })
    // If you specify less than all of the keys, it will inherit from the
    // default shades
    .accentPalette('blue-grey', {
      'default': '200' // use shade 200 for default, and keep all other shades the same
    });



});
