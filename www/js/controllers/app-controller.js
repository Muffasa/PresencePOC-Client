/**
* This is the main controller, all pages have acces to it
*/

angular.module("app-controller",[])

.controller('AppCtrl',['$scope', '$ionicModal', '$timeout','$rootScope', '$ionicUser','$ionicPopup','$cordovaDevice','UserS','GPSS','LocationS','$state',
           function($scope, $ionicModal, $timeout,$rootScope, $ionicUser,$ionicPopup,$cordovaDevice,UserS,GPSS,LocationS,$state) {
  /*$scope.$on('$ionicView.enter', function(e) {

  });*/
  document.addEventListener("pause", function(){
    console.log("app paused");
  }, false);
    document.addEventListener("resume", function(){
    console.log("app resumed");
    //$scope.$apply()
    //location.href = location.origin;
    //window.location.reload(true)
    $state.go($state.current, {}, {reload: true});
  }, false);
   
  $scope.logout = function(){
     UserS.clearUserData().then(function(){
      $state.go('regFlow.login')
     })
  } 
}])