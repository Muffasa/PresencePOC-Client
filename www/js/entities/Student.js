angular.module('entities')

.factory("Student",function($q,GPSS){
	
  var studentData
  var init = function(student){
     studentData = student
  }

  var isAttended = function(student,attendanceId){
  	var d = $q.defer()
  	angular.forEach(student.attendanceCredits, function(key,val){
         if(val.attendnace==attendanceId)
          d.resolve()
  	})
  	d.reject()
  	return d.promise
  }
  var attendToClass = function(attandanceId){
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
            $rootScope.showLoading("Require Location...")
                navigator.geolocation.getAccurateCurrentPosition(function(location){
                          // $rootScope.hideLoading()
                          // $rootScope.showLoading('Opening Attendance...')
                      var geolocation ={
                        lat:location.coords.latitude,
                        lng:location.coords.longitude
                      }
                      var date = new Date().toJSON().slice(0,19)

                      var radius = $rootScope.settingsRadius? $rootScope.settingsRadius:null
                      var upTime = $rootScope.settingsUpTime? $rootScope.settingsUpTime:null
                      ServerComS.studentAttending(attendanceId,geolocation).then(function(res){
                        $rootScope.mainUser.attendanceCreditIds.push(res.data)
                        $scope.initClassData()
                      },function(err){
                        alert("faild to attend, reason:"+err)
                      }).finally(function(){
                            $rootScope.hideLoading()
                      })
                }, function(err){
                  alert("faild To aquire location")
                  $rootScope.hideLoading()  
                }, function(data){
                  console.log("on proggress...data:" +data) 
                }, {desiredAccuracy:20, maxWait:7000, age:60000})


        }
      })
  }

  return{
       init:init,
       isAttendedToClass:isAttendedToClass,
       self:studentData,
       attendToClass:attendToClass
  }

 
})