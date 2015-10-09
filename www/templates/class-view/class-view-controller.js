angular.module('view-controllers')

.controller('ClassViewCtrl',function($scope,$rootScope,$stateParams,$q,$ionicContentBanner,ServerComS,GPSS,AuthS,UserS){

	$scope.$on('$ionicView.enter',function(){
		if($stateParams.fromNotification){
           AuthS.devAuth(false,true).then(function(){
           	$scope.initClassData().then(function(){
			    $scope.studentAttending($stateParams.attendanceId)
           	})
           })
		}
		else{
			$scope.initClassData()
		}
			
	})

	$scope.initClassData = function(){
		var d = $q.defer()
		$rootScope.showLoading()
		ServerComS.getAttendanceById($stateParams.attendanceId).then(function(response){

          	$scope.class = response.data
          	$scope.course = $scope.class.event
          	if(response.data.upTime<10000){
	          		var temp = new Date(response.data.date)
	                $scope.endTime = temp.setMinutes(temp.getMinutes() + response.data.upTime)
	          	}
	          	if($rootScope.userType == 'student')
	          	$scope.checkForStudentAttendance()

	          d.resolve()
                

          },function(err){
          	alert("err tring get class data, err:"+err)
          	d.reject(err)
          }).finally(function(){
          	$rootScope.hideLoading()
          	$scope.spin = false
          })
		return d.promise
	}
	$scope.checkForStudentAttendance = function(){
		$scope.userAtended=false
        $scope.class.attendanceCredits.forEach(function(credit){
        	$rootScope.mainUser.attendanceCreditIds.forEach(function(credit2){
                 if(credit==credit2)
                 	$scope.userAtended = true
        	})
        	
        })

	}
	$scope.studentAttending = function(attendanceId){
		
		 GPSS.isActive().then(function(active){
	        if(!active){
	        	
	              $rootScope.popups.GPSIsOff().then(function(res){
	              	
	                      if(res){
	                        GPSS.goToSettings() 
	                      }
	                    })
	              
	        } 
	        else{
	        	$scope.startAttendanceInfoBanner = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"info",
									                  text:["Attending To Class..."]
									                })
	        	$scope.spin = true
	              navigator.geolocation.getAccurateCurrentPosition(function(location){
	                        $scope.aquirePositionSuccessBanner = $ionicContentBanner.show({
									                  autoClose:400,
									                  type:"success",
									                  text:["Position aquired"]
									                })
			                var geolocation ={
			                	lat:location.coords.latitude,
			                	lng:location.coords.longitude
			                }
			                var date = new Date().toJSON().slice(0,19)

			                var radius = $rootScope.settingsRadius? $rootScope.settingsRadius:null
			                var upTime = $rootScope.settingsUpTime? $rootScope.settingsUpTime:null
			                ServerComS.studentAttending(attendanceId,geolocation).then(function(res){
			                	$scope.estudentAttendingSuccessBanner = $ionicContentBanner.show({
									                  autoClose:3000,
									                  type:"success",
									                  text:["Successfuly attended!"]
									                })
			                	UserS.getUserData().then(function(){
			                		$scope.initClassData()
			                	})
			                	
			                },function(err){
			                	$scope.eerrorBannerClose = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["an error occurred, please try again later"]
									                })
			                	$scope.spin = false
			                })
	              }, function(err){
	                $scope.errorBannerClose = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["failed To aquire location"]
									                })
	                $scope.spin = false  
	              }, function(data){
	                console.log("on proggress...data:" +data) 
	              }, {desiredAccuracy:20, maxWait:7000, age:60000})


	      }
	    })
	}
	
	$scope.closeAttendance = function(attendanceId){
		$scope.closeAttendanceInfoBanner = $ionicContentBanner.show({
									                  autoClose:1000,
									                  type:"info",
									                  text:["Closing Attendance..."]
									                })
        $scope.spin = true
        ServerComS.closeAttendance(attendanceId).then(function(res){
         $scope.initClassData()
        },function(err){
           $scope.errorBannerClose = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["Failed to close attendance"]
									                })
           $scope.spin = false
        })
	}    
	$scope.countDownfinished = function(){
		$scope.initClassData()
	}
  $scope.refresh = function(){
	    $scope.initClassData().then(function(response){
	          
		},function(err){

		}).finally(function(){
				 $scope.$broadcast('scroll.refreshComplete')
		})

  }
 $scope.$on('$destroy', function() {
    if($scope.errorBannerClose)
    $scope.errorBannerClose.close()

    if($scope.closeAttendanceInfoBanner)
    $scope.closeAttendanceInfoBanner.close()

    if($scope.studentAttendingSuccessBanner)
    $scope.studentAttendingSuccessBanner.close()

    if($scope.startAttendanceInfoBanner)
    $scope.startAttendanceInfoBanner.close()

    if($scope.aquirePositionSuccessBanner)
    $scope.aquirePositionSuccessBanner.close()

  })
})