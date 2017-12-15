myApp.controller('UserController', function (UserService, $mdDialog) {
  console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;
  vm.countries = UserService.countries.data;
  vm.userProjects = UserService.userProjects;
  vm.selectedIndex = UserService.userProjects.selectedIndex;
  //this is for the list of user projects


// Bar chart
  new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
  });

//gets users projects
  vm.userService.getProjects(vm.userObject.id);
  //dashboard dialog
  vm.upload = function (ev, i) {
    // userService.getProjects.selectedIndex = i;
    console.log('Clicked showMore', i);
    

    $mdDialog.show({
      controller: 'DashboardDialogController as dc',
      templateUrl: 'views/templates/dashboarddialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true

    })
  }


  vm.hide = function () {
    $mdDialog.hide();
  };

  vm.cancel = function () {
    $mdDialog.cancel();
  };

  vm.answer = function (answer) {
    console.log(answer);
    $mdDialog.hide(answer);
  };
  
  vm.showProject = function (ev, i) {
    selectedIndex = i;
    console.log('clicked showProject', i,);
    window.location.href = '/#/projects';
  };

  
});
//end of user controller 




