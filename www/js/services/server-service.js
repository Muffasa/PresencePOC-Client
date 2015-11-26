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
		sendPhoneNumberToServer : function(tempUser){
		    var d =$q.defer()
		    var data = {MPN:tempUser.MPN} 
		    POST("tempUserSingUp",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })

		    return d.promise 
		  },
		  sendIDToServer : function(ID){
		    var d =$q.defer()
		    var data = {ID:ID} 
		    POST("IDEvaluation",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise 
		  },
		validateSmsCode: function(tempUser,code){
		    var d =$q.defer()
		    var data = {MPN:tempUser.MPN,smsCode:code}
		    POST("validatePhoneNumber",data).then(function(res){
		       d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise
		  },
	    createStudentUser : function(student){
		    var d =$q.defer()
		    var data = {student:student,MPN:JSON.parse(window.localStorage.getItem('MPN'))}
		    POST("studentSingUp",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise
		  },
	    createMasterUser : function(master){
		    var d =$q.defer()
		    var data = {master:master,MPN:JSON.parse(window.localStorage.getItem('MPN'))}
		    POST("masterSingUp",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise
		  },
	    getUserCredentials : function(MPN,password){
		    var d =$q.defer()
		    var data = {MPN:MPN,hashedPassword:password}
		    POST("getUserCredentials",data).then(function(res){
		      console.log("user now capable of communiction with the server as "+ res.data.clientType)
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise
		  },

		/////////////Require Auth (uid and authToken)
		
	    getUserCredentialsByAuth : function(data){
		    var d =$q.defer()
		    //var data = {uid:uid,authToken:authToken}
		    POST("getUserCredentialsByAuth",data).then(function(res){
		      //todo this rout in server, if user logged in, new session
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise
		  },  
	    validateAuth : function(data){
		    var d =$q.defer()
		    //var data = {uid:uid,authToken:authToken}//any request to the server must contains this properties
		    POST("validateAuth",data).then(function(res){
		      console.log("Auth validated " + res)
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })

		    return d.promise
		  },
	    getEventsByMasterID : function(ID){
		    var d =$q.defer()
		    var data = {ID:ID}
		    POST("getEventsByMasterID",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
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
		  studentAttending : function(attendanceId,geoLocation){
		    var d =$q.defer()
		    var data = {attendanceId:attendanceId,geoLocation:geoLocation}
		    POST("studentAttending",data).then(function(res){
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
		  },
		  getClassesByCourseId : function(eventId){
		    var d =$q.defer()
		    var data = {eventId:eventId}
		    POST("getAttendancesByEventId",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  }

		  ,
		  submitID : function(ID){
		    var d =$q.defer()
		    var data = {ID:ID}
		    POST("submitID",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  } 
		  ,
		  attachPhoneNumberToID : function(ID,phoneNumber,email){
		    var d =$q.defer()
		    var data = {ID:ID,phoneNumber:phoneNumber,email:email}
		    POST("attachPhoneNumberToID",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  } 
		  ,
		  sumbmitSMSCode : function(eventId){
		    var d =$q.defer()
		    var data = {eventId:eventId}
		    POST("sumbmitSMSCode",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  }       
		  ,
		  sumbmitSMSCodeMaster : function(SMSCode,authCode,email){
		    var d =$q.defer()
		    var data = {SMSCode:SMSCode,authCode:authCode,email:email}
		    POST("sumbmitSMSCodeMaster",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  creatAuthSession : function(token){
		    var d =$q.defer()
		    var data = {token:token}
		    POST("creatAuthSession",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  testAuth : function(){
		    var d =$q.defer()
		    POST("testCredentials").then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  },
		  testCredentials : function(authToken,uid){
		    var d =$q.defer()
		    var data = {authToken:authToken,uid:uid}
		    POST("testCredentials",data).then(function(res){
		      d.resolve(res);
		    },function(err){
		      d.reject(err);
		    })
 
		    return d.promise  
		  }    
	}		 
}])

