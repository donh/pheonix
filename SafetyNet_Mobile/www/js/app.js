// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('SafetyNet', [
  'ionic',
  'mission',
  'employee',
  'home',
  'map',
  'ngMap',
  'ngCordova',
  'safetyNet.services',
  'employee.utils'
])

.config(function ( $stateProvider, $urlRouterProvider ) {

  $stateProvider

     .state('walkthrough',{
        url: '/',
        templateUrl : "views/walkthrough/walkthrough.html"

     })

    .state('login',{
      url : '/login',
      templateUrl : "views/login/login.html"

    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "views/side-menue/menu.html"
    
    })


    .state('app.dashboard',{
      url:'/dashboard',
      abstract:true,
      views:{
        'menuContent':{
          templateUrl:"views/dashboard/dashboard-main.html"
        }
      }
    })

    .state('app.dashboard.home',{
      url:'/home',
      views:{
        'tab-dashboard':{
          templateUrl:"views/dashboard/dashboard-home.html"
        }
      }  
    })


    .state('app.mission',{
      url:"/mission",
      views:{
        'menuContent':{
          templateUrl:"views/mission/mission.html"
        }
      }
    })

    .state('app.map',{
      url:"/map",
      views:{
        'menuContent':{
          templateUrl:"views/map/map_home.html"
        }
      }
    })

    .state('app.missioncontrol',{
      url:'/missioncontrol',
      abstract: true,
      views:{
        'menuContent':{
          templateUrl:"views/mission-control/missioncontrol-main.html"
        }
      }
    })


    .state('app.missioncontrol.home',{
      url:"/home",
      views:{
        'tab-home':{
          templateUrl:"views/mission-control/missioncontrol-home.html"
        }
      }
    })


    .state('app.missioncontrol.detail',{
      url:"/detail",
      views:{
        'tab-home':{
        templateUrl:"views/mission-control/missioncontrol-detail.html"
        }
      }
    })


    .state('app.missioncontrol.search',{
      url:"/search",
      views:{
        'tab-search':{
          templateUrl:"views/mission-control/missioncontrol-search.html"

        }
      }
    })

    .state('app.missioncontrol.saved',{
      url:"/saved",
      views:{
        'tab-saved':{
          templateUrl:"views/mission-control/missioncontrol-saved.html"

        }
      }
    })

  
  $urlRouterProvider.otherwise("/login");
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  localStorage.clear();

});


