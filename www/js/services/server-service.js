angular.module("server-service",[])

.factory("ServerComS",['$rootScope','$q','$http',
	    function($rootScope,$q,$http){
	//var baseUrl = 'http://46.101.206.21:8080/';
           var baseUrl = $rootScope.serverUrl


        var POST = function(action,data){
        	var d =$q.defer();
            
            if(!data||!data.uid||!data.authToken)
        	if($rootScope.authToken&&$rootScope.uid){
        		
        		if(!data)
        			data={}

	        	data.authToken = $rootScope.authToken
	        	data.uid = $rootScope.uid
            }

			$http.post($rootScope.serverUrl+action,data).then(function(res){
			//	console.log('ServerComs POST res:'+JSON.stringify(res))
			     d.resolve(res);
			    },function(err){
			    	console.log('server responded with error:'+err)
			      d.reject(err);
			    })
		    return d.promise;
        }
	
	return{
		//all the requests here must be authorized
		testCredentials : function(authToken,uid){
			    var d =$q.defer()
			    var data = {authToken:authToken,uid:uid}
			    POST("testCredentials",data).then(function(res){
			      d.resolve(res);
			    },function(err){
			      d.reject(err);
			    })
	 
			    return d.promise  
			},
	   	    getUserCredentialsByAuth : function(data){
			    var d =$q.defer()
			    POST("getUserCredentialsByAuth",data).then(function(res){
			      d.resolve(res);
			    },function(err){
			      d.reject(err);
			    })
			    return d.promise
		    },



		    //courses
   		    getEventsById : function(id){
		    var d =$q.defer()
		    var data = {eventId:id}
		    POST("getUserEvents",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
  
		    return d.promise  
		   }, 
		   //course
		   getEventById : function(id){
		    var d =$q.defer()
		    var data = {eventId:id}
		    POST("getEventById",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  startAttendance : function(eventId,geoLocation,radius,date,upTime){
		    var d =$q.defer()
		    var data = {eventId:eventId,geoLocation:geoLocation,radius:radius,date:date,upTime:upTime}
		    POST("masterStartAttendance",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  closeAttendance : function(attendanceId){
		    var d =$q.defer()
		    var data = {attendanceId:attendanceId}
		    POST("masterCloseAttendance",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  masterAttendStudent : function(studentId,attendanceId,date){
		    var d =$q.defer()
		    
		    var data = {studentId:studentId,attendanceId:attendanceId,date:date}
		    POST("masterAttendStudent",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },		  
		  studentAttending : function(attendanceId,geoLocation){ //also in class-view
		    var d =$q.defer()
		    var data = {attendanceId:attendanceId,geoLocation:geoLocation}
		    POST("studentAttending",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise   
		  },
		  //classes
		  getClassesByCourseId : function(eventId){
		    var d =$q.defer()
		    var data = {eventId:eventId}
		    POST("getAttendancesByEventId",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
          //class
		  getAttendanceById : function(attendanceId){
		    var d =$q.defer()
		    var data = {attendanceId:attendanceId}
		    POST("getAttendanceById",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  getStudentsByCourseId : function(eventId){
		    var d =$q.defer()
		    var data = {eventId:eventId}
		    POST("getStudentsByEventId",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  }		  
	}		 
}])

