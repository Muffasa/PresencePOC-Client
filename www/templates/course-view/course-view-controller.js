angular.module('view-controllers')

.controller('CourseViewCtrl',function($rootScope,$scope,$q,$state,$stateParams,$ionicContentBanner,$timeout,GPSS,ServerComS,UserS){

	$scope.$on('$ionicView.beforeEnter',function(){
	   $rootScope.showLoading() 
		$scope.getCourseData().finally(function(){
			$rootScope.hideLoading()
		})
	})
		
	$scope.getCourseData = function(){ 
		var d = $q.defer()
		ServerComS.getEventById($stateParams.eventId).then(function(response){
	          $scope.course = response.data
	          $scope.activeClass = response.data.activeAttendance
	          $rootScope.currentCourse = response.data
	          if(response.data.activeAttendanceInfo){
	                $scope.endTime = new Date(response.data.activeAttendanceInfo.ClosingTime)
	          	}
	          
	          if($rootScope.userType == 'student') 
	          	$scope.checkForStudentAttendance()

            d.resolve()
		},function(err){
	               console.log(err)
	               var errorBannerClose = $ionicContentBanner.show({
	                  autoClose:4000,
	                  type:"error",
	                  text:["an error occurred, please try again later"]
	                })
	               d.reject()
		}).finally(function(){
			$scope.spin = false
		})
		
		return d.promise
	}
	$scope.checkForStudentAttendance = function(){
		$scope.userAttended=false
        $scope.activeClass.attendanceCredits.forEach(function(credit){
        	$rootScope.mainUser.attendanceCreditIds.forEach(function(credit2){
                 if(credit==credit2)
                 	$scope.userAttended = true
        	})
        	
        })

	}
    $scope.countDownfinished = function(){
   	$scope.getCourseData()
    }
	$scope.openAttendance =  function(eventId){
	       
	       GPSS.isActive().then(function(active){
	        if(!active){
	        	
	              $rootScope.popups.GPSIsOff().then(function(res){
	              	$rootScope.hideLoading()
	                      if(res){
	                        GPSS.goToSettings() 
	                      }
	                    })
	             
	        } 
	        else{
	        	$scope.openAttendanceInfoBanner = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"info",
									                  text:["Opening Attendance..."]
									                })
	        	$scope.spin = true
	              navigator.geolocation.getAccurateCurrentPosition(function(location){

			                var geolocation ={
			                	lat:location.coords.latitude,
			                	lng:location.coords.longitude
			                }
			                var date = new Date().toJSON().slice(0,19)

			                var radius = $rootScope.settingsRadius? $rootScope.settingsRadius:null
			                var upTime = $rootScope.settingsUpTime? $rootScope.settingsUpTime:null
			                ServerComS.startAttendance(eventId,geolocation,radius,date,upTime).then(function(res){
			                	$scope.openAttendnaceSuccessBanner = $ionicContentBanner.show({
									                  autoClose:2800,
									                  interval:1400,
									                  type:"success",
									                  text:["Attendance succesefuly opened","Notifications has been sent"]
									                })
			                	$timeout(function(){
			                		$state.go('app.class-view',{attendanceId:res.data})
			                		$scope.spin = false
			                	},4000)
			                },function(err){
			                	//alert("faild to open attendence, please try again later")
			                	$scope.errorBannerClose = $ionicContentBanner.show({
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
	                console.log("on proggress...data:" +JSON.stringify(data))
	              }, {desiredAccuracy:20, maxWait:7000})


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
         $scope.getCourseData().finally(function(){$scope.spin = false})
        },function(err){
           $scope.errorBannerClose = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"error",
									                  text:["Failed to close attendance"]
									                })
           $scope.spin = false
        })

	}

	$scope.studentAttending = function(attendanceId){
		 GPSS.isActive().then(function(active){
	        if(!active){
	        	
	              $rootScope.popups.GPSIsOff().then(function(res){
	              	$rootScope.hideLoading()
	                      if(res){
	                        GPSS.goToSettings() 
	                      }
	                    })
	              $rootScope.hideLoading()
	        } 
	        else{
	        	$scope.startAttendanceInfoBanner = $ionicContentBanner.show({
									                  autoClose:4000,
									                  type:"info",
									                  text:["Attending To Class..."]
									                })
	        	$scope.spin = true
	              navigator.geolocation.getAccurateCurrentPosition(function(location){

			                var geolocation ={
			                	lat:location.coords.latitude,
			                	lng:location.coords.longitude
			                }
			                var date = new Date().toJSON().slice(0,19)

			                var radius = $rootScope.settingsRadius? $rootScope.settingsRadius:null
			                var upTime = $rootScope.settingsUpTime? $rootScope.settingsUpTime:null
			                ServerComS.studentAttending(attendanceId,geolocation).then(function(res){
			                	UserS.getUserData().then(function(){
			                		$scope.studentAttendingSuccessBanner = $ionicContentBanner.show({
									                  autoClose:3000,
									                  type:"success",
									                  text:["Successfuly attended!"]
									                })
			                		$scope.getCourseData().then(function(){ // for 'you have been successfuly attended to this active class course'
			                			
			                		   $scope.spin = false	
			                		})
			                	})
			                	
			                },function(err){
			                    $scope.errorBannerClose = $ionicContentBanner.show({
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
  $scope.refresh = function(){
	    $scope.getCourseData().then(function(response){
	          
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

    if($scope.openAttendnaceSuccessBanner)
    $scope.openAttendnaceSuccessBanner.close()
  })

})