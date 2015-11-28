angular.module('view-controllers')

.controller('ClassViewCtrl',['$scope','$rootScope','$stateParams','$q','$ionicContentBanner','ServerComS','GPSS','AuthS','UserS',
	       function($scope,$rootScope,$stateParams,$q,$ionicContentBanner,ServerComS,GPSS,AuthS,UserS){

	$scope.$on('$ionicView.enter',function(){
		$rootScope.showLoading()
		if($stateParams.fromNotification){
			navigator.splashscreen.hide()
           AuthS.auth(true).then(function(){
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
		
		ServerComS.getAttendanceById($stateParams.attendanceId).then(function(response){

          	$scope.class = response.data
          	$scope.course = $scope.class.event
          	if(response.data.upTime<10000){
	          		var temp = new Date(response.data.date)
	                $scope.endTime = temp.setMinutes(temp.getMinutes() + response.data.upTime)
	          	}
	          	if($rootScope.userType == 'student'){
	          	UserS.getUserData().then(function(){
	          	 checkForStudentAttendance()
	            })
	          } 

	          d.resolve()
                

          },function(err){
          	alert("err tring get class data, err:"+err)
          	d.reject(err)
          }).finally(function(){
          	$rootScope.hideLoading()
          	$scope.spin2 = false
          })
		return d.promise
	}

	var checkForStudentAttendance = function(){
		$scope.userAtended=false
        $scope.class.attendanceCredits.forEach(function(credit){
        	$rootScope.mainUser.attendanceCreditIds.forEach(function(credit2){
                 if(credit==credit2)
                 	$scope.userAtended = true
        	})
        	
        })

	}

	$scope.studentAttending = function(attendanceId){
		$scope.$apply()
		 GPSS.isActive().then(function(active){
	        if(!active){
	        	
	              $rootScope.popups.GPSIsOff().then(function(res){
	              	
	                      if(res){
	                        GPSS.goToSettings() 
	                      }
	                    })
	                    $rootScope.hideLoading()              
	        } 
	        else{
	        	$scope.spin2 = true
	        	            $ionicContentBanner.show({
									                  autoClose:1,
									                  type:"info",
									                  text:[""]
									                })()

	        	$scope.startAttendanceInfoBanner2 = $ionicContentBanner.show({
									                  autoClose:4001,
									                  type:"info",
									                  text:["Attending To Class..."]
									                })
	        	
	              navigator.geolocation.getAccurateCurrentPosition(function(location){

			                var geolocation ={
			                	lat:location.coords.latitude,
			                	lng:location.coords.longitude
			                }
			                var date = new Date().toJSON().slice(0,19)

			                ServerComS.studentAttending(attendanceId,geolocation).then(function(res){		                	
			                	UserS.getUserData().then(function(){
			                		$scope.studentAttendingSuccessBanner2 = $ionicContentBanner.show({
									                  autoClose:3000,
									                  type:"success",
									                  text:["Successfuly attended!"]
									                })
			                		$scope.initClassData()
			                	})
			                	
			                },function(err){
			                	$ionicContentBanner.show({
									                  autoClose:1,
									                  type:"error",
									                  text:[""]
									                })()
			                	$scope.errorBannerClose2 = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["an error occurred, please try again later"]
									                })
			                	$scope.spin2 = false
			                })
	              }, function(err){
	              	$ionicContentBanner.show({
									                  autoClose:1,
									                  type:"error",
									                  text:[""]
									                })()
	                $scope.errorBannerClose2 = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["failed To aquire location"]
									                })
	                $scope.spin2 = false  
	              }, function(data){
	                console.log("on proggress...data:" +data) 
	              }, {desiredAccuracy:30, maxWait:10000})


	      }
	    })
	}
	
	$scope.closeAttendance = function(attendanceId){
		$scope.closeAttendanceInfoBanner2 = $ionicContentBanner.show({
									                  autoClose:1000,
									                  type:"info",
									                  text:["Closing Attendance..."]
									                })
        $scope.spin2 = true
        ServerComS.closeAttendance(attendanceId).then(function(res){
         $scope.initClassData()
        },function(err){
           $scope.errorBannerClose2 = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["Failed to close attendance"]
									                })
           $scope.spin2 = false
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
    if($scope.errorBannerClose2 && typeof $scope.errorBannerClose2.close == 'function')
    $scope.errorBannerClose2.close()

    if($scope.closeAttendanceInfoBanner2 && typeof $scope.closeAttendanceInfoBanner2.close == 'function')
    $scope.closeAttendanceInfoBanner2.close()

    if($scope.studentAttendingSuccessBanner2 && typeof $scope.studentAttendingSuccessBanner2.close == 'function')
    $scope.studentAttendingSuccessBanner2.close()

    if($scope.startAttendanceInfoBanner2 && typeof $scope.startAttendanceInfoBanner2.close == 'function')
    $scope.startAttendanceInfoBanner2.close()

    if($scope.aquirePositionSuccessBanner2 && typeof $scope.aquirePositionSuccessBanner2.close == 'function')
    $scope.aquirePositionSuccessBanner2.close()

  })
}])