// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('PresencePOC', ['ionic','timer','controllers-loader','services-loader','jett.ionic.filter.bar','jett.ionic.content.banner','ionicProcessSpinner','ngCordova','ngMessages','ionic.service.core','ionic.service.push'])

.run(['$ionicPlatform','$rootScope','$timeout',
     function($ionicPlatform,$rootScope,$timeout) {
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

   $rootScope.authStatus = false;
   //stateChange event
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      $rootScope.authStatus = toState.authStatus;
      if($rootScope.authStatus){
        
      
      }
    });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    console.log("state changed to: "+toState.url);
    if(toState.name.indexOf('app') > -1){
      $timeout(function(){
        angular.element(document.querySelector('#leftMenu' )).removeClass("hide");
      },300);
    } 
  });
}])

.config(['$stateProvider', '$urlRouterProvider',
       function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('work-space', {
    url: '/work-space',
    templateUrl: 'templates/work-space-view/work-space-view.html',
    controller: 'WorkSpaceCtrl'
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('welcome', {
    url: '/welcome',
    abstract: true,
    templateUrl: 'templates/welcome-menu.html',
    controller: 'WelcomeCtrl'
  })  
  .state('regFlow', {
    url: '/regFlow',
    abstract: true,
    templateUrl: 'templates/regFlow.html',
    controller: 'WelcomeCtrl'
  }) 
  //--------------------------------------
  .state('regFlow.ID-enter', {
    url: '/ID-enter',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/ID-enter-view/ID-enter-view.html',
        controller:'IDEnterViewCtrl'
      }
   },
  authStatus: false,
  cantBackTo:true
  })
  .state('regFlow.SMS-validation', {
    url: '/SMS-validation/:newPhoneNumber',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/SMS-validation-view/SMS-validation-view.html',
        controller:'SMSValidationViewCtrl'
      }
   }, 
  authStatus: false,
  cantBackTo:true
  })
  .state('regFlow.choose-password', {
    url: '/SMS-validation',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/choose-password-view/choose-password-view.html',
        controller:'ChoosePasswordViewCtrl'
      }
   },
  authStatus: false,
  cantBackTo:true
  })
  .state('regFlow.attach-phone', {
    url: '/regFlow.attach-phone',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/attach-phone-view/attach-phone-view.html',
        controller:'AttachPhoneViewCtrl'
      }
   },
  authStatus: false,
  cantBackTo:true
  })
  .state('regFlow.login', {
    url: '/regFlow.login',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/login-view/login-view.html',
        controller:'LoginViewCtrl'
      }
   },
  authStatus: false,
  cantBackTo:true
  }) 
  /*.state('regFlow.upload-ID-photo', {
    url: '/upload-ID-photo',
    views: {
      'menuContent': {
        templateUrl: 'templates/registration-flow-views/upload-ID-photo/upload-ID-photo.html',
      }
   },
  authStatus: false,
  cantBackTo:true
  })*/
//--------------------------------------
.state('welcome.phone-enter', {
    url: '/phone-enter',
    views: {
      'menuContent': {
        templateUrl: 'templates/phone-enter.html'
      }
    },
    //controller:"phoneEnterCtrl",
    authStatus: false
  })
 .state('welcome.sms-code', {
    url: '/sms-code',
    views: {
      'menuContent': {
        templateUrl: 'templates/sms-code-confirmation.html',
      }
   },
  authStatus: false,
  cantBackTo:true
  })
 .state('welcome.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signin.html'
      }
    },
    controller:'LoginCtrl',
  authStatus: false
  })
 .state('welcome.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/tab-signup.html',
      }
   },
  authStatus: false
  })
//--------------------------------------
.state('app.home-view', {
    url: '/home-view',
    views: {
      'menuContent': {
        templateUrl: 'templates/home-view/home-view.html',
        controller: 'HomeViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
.state('app.courses-view', {
    url: '/courses-view',
    views: {
      'menuContent': {
        templateUrl: 'templates/courses-view/courses-view.html',
        controller: 'CoursesViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
.state('app.course-view', {
    url: '/course-view/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/course-view/course-view.html',
        controller: 'CourseViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
.state('app.classes-view', {
    url: '/classes-view/:eventId',
    views: {
      'menuContent': {
        templateUrl: 'templates/classes-view/classes-view.html',
        controller: 'ClassesViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
.state('app.class-view', {
    url: '/class-view/:attendanceId:fromNotification',
    views: {
      'menuContent': {
        templateUrl: 'templates/class-view/class-view.html',
        controller: 'ClassViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
.state('app.students-view', {
    url: '/students-view/:attendanceId',
    views: {
      'menuContent': {
        templateUrl: 'templates/students-view/students-view.html',
        controller: 'StudentsViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })

  .state('app.classes', {
    url: '/classes',
    views: {
      'menuContent': {
        templateUrl: 'templates/classes.html'
      }
    },
  authStatus: true
  })
  .state('app.settings-view', {
    url: '/settings-view',
    views: {
      'menuContent': {
        templateUrl: 'templates/settings-view/settings-view.html',
        controller: 'SettingsViewCtrl'
      }
   },
  authStatus: true,
  master: true
  })
;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/regFlow/ID-enter');
}]);
