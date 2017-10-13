// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var config = {
    apiKey: "AIzaSyCVjkePmgfC5jFoT3BDl2L-DY6Ak-ceE0g",
          authDomain: "ayobacaalkitab.firebaseapp.com",
          databaseURL: "https://ayobacaalkitab.firebaseio.com/",
          storageBucket: "gs://ayobacaalkitab.appspot.com",
};
var mainApp = firebase.initializeApp(config);
var auth = firebase.auth();
var rootRef = firebase.database().ref();
var displayNames = 'noname';


angular.module('starter', ['ionic', 'starter.controllers', 'ngSanitize', 'firebase', 'LocalStorageModule', 'angularMoment'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
    
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })

  .state('app.notif', {
      url: '/notif',
      views: {
        'menuContent': {
          templateUrl: 'templates/notification.html',
          controller: 'NotifCtrl'
        }
      }
    })

  .state('app.chat', {
        url: '/chat/:group',
        views: {
        'menuContent': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl'
        }
      }
    })

  .state('app.datebible', {
      url: '/datebible',
      views: {
        'menuContent': {
          templateUrl: 'templates/datebible.html',
          controller: 'DateBibleCtrl'
        }
      }
    })

   .state('app.bibleyesterday', {
      url: '/bibleyesterday',
      views: {
        'menuContent': {
          templateUrl: 'templates/bible.html',
          controller: 'BibleYesterdayCtrl'
        }
      }
    })

   .state('app.bibletoday', {
      url: '/bibletoday',
      views: {
        'menuContent': {
          templateUrl: 'templates/bible.html',
          controller: 'BibleTodayCtrl'
        }
      }
    })
   .state('app.bibletomorrow', {
      url: '/bibletomorrow',
      views: {
        'menuContent': {
          templateUrl: 'templates/bible.html',
          controller: 'BibleTomorrowCtrl'
        }
      }
    })
    
    
  .state('app.bible', {
      url: '/bible/:bibleId',
      views: {
        'menuContent': {
          templateUrl: 'templates/bible.html',
          controller: 'BibleCtrl'
        }
      }
    })

   .state('app.daterekap', {
      url: '/daterekap',
      views: {
        'menuContent': {
          templateUrl: 'templates/daterekap.html',
          controller: 'DateRekapCtrl'
        }
      }
    })

   .state('app.rekapyesterday', {
      url: '/rekapyesterday',
      views: {
        'menuContent': {
          templateUrl: 'templates/rekap.html',
          controller: 'RekapYesterdayCtrl'
        }
      }
    })

   .state('app.rekaptoday', {
      url: '/rekaptoday',
      views: {
        'menuContent': {
          templateUrl: 'templates/rekap.html',
          controller: 'RekapTodayCtrl'
        }
      }
    })

   .state('app.rekaptomorrow', {
      url: '/rekaptomorrow',
      views: {
        'menuContent': {
          templateUrl: 'templates/rekap.html',
          controller: 'RekapTomorrowCtrl'
        }
      }
    })


    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
