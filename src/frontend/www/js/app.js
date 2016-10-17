// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      console.log("Device Ready");
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
      
      
      //Firebase Auth
       // Initialize Firebase
//  var config = {
//    apiKey: "AIzaSyAZeLU8YJ15OdTkWQfjC63BLrrwfSyprfk",
//    authDomain: "westmancomtopoist.firebaseapp.com",
//    databaseURL: "https://westmancomtopoist.firebaseio.com",
//    storageBucket: "westmancomtopoist.appspot.com",
//  };
//  firebase.initializeApp(config);

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

//  .state('tab.dash', {
//    url: '/dash',
//    views: {
//      'tab-dash': {
//        templateUrl: 'templates/tab-dash.html',
//        controller: 'DashCtrl'
//      }
//    }
//  })

  .state('tab.topos', {
      url: '/topos',
      views: {
        'tab-topos': {
          templateUrl: 'templates/tab-topos.html',
          controller: 'ToposCtrl'
        }
      }
    })
    .state('tab.topo-detail', {
      url: '/topos/:topoId',
      views: {
        'tab-topos': {
          templateUrl: 'templates/topo-detail.html',
          controller: 'TopoDetailCtrl'
        }
      }
    })
      .state('tab.new-topo-detail', {
      url: '/newTopo',
      views: {
        'tab-topos': {
          templateUrl: 'templates/new-topo-detail.html',
          controller: 'NewTopoDetailCtrl'
        }
      }
    })
    .state('tab.map', {
    url: '/map',
    views: {
      'tab-map': {
        templateUrl: 'templates/tab-map.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
//    .state('tab.draw', {
//    url: '/draw',
//    views: {
//      'tab-draw': {
//        templateUrl: 'templates/tab-draw.html',
//        controller: 'DrawCtrl'
//      }
//    }
//  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('tab/topos');

});
