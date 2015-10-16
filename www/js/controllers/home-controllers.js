angular.module("home-controllers",[])

.controller('MasterController',['$rootScope','$scope','$ionicFilterBar','$timeout','ServerComS','GPSS',
           function($rootScope,$scope,$ionicFilterBar,$timeout,ServerComS,GPSS){
  $scope.$on('$ionicView.enter', function(e) {
    $rootScope.showLoading()
      $timeout(function(){
        ServerComS.getEventsByMasterID($rootScope.mainUser.ID).then(function(res){
          $scope.events = res.data
          $scope.noEvents = $scope.events.length == 0
        },function(err){
          $rootScope.popups.faildToGetEvents().then(function(res){

          })
        }).finally(function(){
          $rootScope.hideLoading()
        })
      },500)
     
  })

  $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.events,
        update: function (filteredItems, filterText) {
          $scope.events = filteredItems
          if (filterText) {
            console.log(filterText)
          }
        },
        filterProperties: ['name']
      })
    }
  $scope.refreshEvents = function(){
    ServerComS.getEventsByMasterID($rootScope.mainUser.ID).then(function(res){
       $scope.events = res.data
       $scope.noEvents = $scope.events.length == 0

      // FirebaseS.getActiveEvents($rootScope.mainUser.ID).then(function(activeEvents){
      //   $scope.activeEvents = activeEvents
      // })

    },function(err){

    }).finally(function(){
      $scope.$broadcast('scroll.refreshComplete')
    })
  }
	$scope.startAttendance = function(eventId){
       $rootScope.showLoading("Opening Attendence...")
       GPSS.isActive().then(function(active){
        if(!active){
        	$rootScope.hideLoading()
              $rootScope.popups.GPSIsOff.then(function(res){
                      if(res){
                        GPSS.goToSettings();  
                      }
                    });
        }
        else{
              navigator.geolocation.getAccurateCurrentPosition(function(location){
                alert("Got Position: "+location.coords.latitude +","+location.coords.longitude);
		                var geolocation ={
		                	lat:location.coords.latitude,
		                	lng:location.coords.longitude
		                }
		                var date = new Date().toJSON().slice(0,19)

		                var radius = $rootScope.settingsRadius? $rootScope.settingsRadius:null
		                var upTime = $rootScope.settingsUpTime? $rootScope.settingsUpTime:null
		                ServerComS.startAttendance(eventId,geolocation,radius,date,upTime).then(function(res){
		                	$rootScope.hideLoading()
		                	alert("Students can now attend to the class. Notifications has been sent to the class students")
		                },function(err){
		                	$rootScope.hideLoading()
		                	alert("faild to open attendence, please try again later")
		                })
              }, function(err){
                alert("faild To aquire location");  
              }, function(data){
                console.log("on proggress...data:" +data)
              }, {desiredAccuracy:20, maxWait:7000})


      }
    })
	}
	
}])
/*.controller('StudentController',function(){
	
})
.controller('EventDetailCtrl',function($rootScope,$scope,$state,$stateParams,ServerComS){
  ServerComS.getEventById($stateParams.eventId).then(function(res){
    $scope.event = res.data.event
    $scope.attendance = res.data.attendance
  },function(err){
    $rootScope.popups.faildToGetEvents().then(function(res){

          })
  })
})*/