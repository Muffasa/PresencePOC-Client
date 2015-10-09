angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope, $ionicUser,$ionicPush,$ionicPopup,$cordovaDevice,GPSS,LocationS) {

  $scope.$on('$ionicView.enter', function(e) {

  });
  document.addEventListener("pause", function(){
    console.log("app paused");
  }, false);
    document.addEventListener("resume", function(){
    console.log("app resumed");
    //location.href = location.origin;
  }, false);
      
  $scope.getLocation = function(){
    GPSS.isActive().then(function(active){
      if(!active){
        $rootScope.popups.GPSIsOff.then(function(res){
                if(res){
                  GPSS.goToSettings();  
                }
              });
      }
      else{
        LocationS.getCurrentLocation().then(function(location){
          alert("Got Position: "+location.lat +","+location.lng);
        },function(error){
          alert(error);
        })
      }
    })
  }

    $scope.getAccurateLocation = function(){
      GPSS.isActive().then(function(active){
        if(!active){
              $rootScope.popups.GPSIsOff.then(function(res){
                      if(res){
                        GPSS.goToSettings();  
                      }
                    });
        }
        else{
              navigator.geolocation.getAccurateCurrentPosition(function(location){
                alert("Got Position: "+location.coords.latitude +","+location.coords.longitude);
              }, function(err){
                alert(err);  
              }, function(data){
                console.log("on proggress...data:" +data)
              }, {desiredAccuracy:20, maxWait:7000})

             var onSuccess = function(location){
                alert("Got Position: "+location.lat +","+location.lng);
              }
                
              var onError = function(err){
                alert(err);  
              }

              var onProgress = function(data){
                console.log("on proggress...data:" +data)
              }
      }
    })
  }
  $scope.loginData = {};
  $scope.gpsStatus = function(){
    /*Diagnostic.isLocationEnabledSetting(function(success){
      success==0? $scope.gpsOn = "off":$scope.gpsOn = "on";
    },function(error){
      console.log(error);
    })*/
    GPSF.isActive().then(function(active){
        active? $scope.gpsOn = "on":$scope.gpsOn = "off";
    },function(error){
        console.log(error);
    })
  };
  

  $scope.switchToLocationSettings = function(){
    //Diagnostic.switchToLocationSettings(function(){},function(error){console.log(error)});
    GPSF.goToSettings();
  };

 $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      user.user_id = $ionicUser.generateGUID();  
    };

    // Add some metadata to your user object.
    var uuid = window.cordova? $cordovaDevice.getUUID():"no device";
    angular.extend(user, {
      name: 'Yotam Itshaky',
      bio: 'I am a student',
      uuid:uuid
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

    $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        
         console.log(notification);
        return true;
      }
    });
  };


})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
