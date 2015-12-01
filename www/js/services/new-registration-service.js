angular.module('new-registration-service', [])

.factory("NewRegS",["$rootScope","$q","$http",
 function($rootScope,$q,$http){
		
		var baseUrl = $rootScope.serverUrl

        var POST = function(action,data){
        	$rootScope.showLoading()
        	var d =$q.defer();
        	var targetUrl = $rootScope.serverUrl+action

			$http.post(targetUrl,data).then(function(res){
			//	console.log('postID POST res:'+JSON.stringify(res))
			     d.resolve(res.data);
			    },function(err){
			    	console.log('server responded with error:'+err.message)
			      err.data.message? d.resolve(err.data):d.reject(err)
			    }).finally(function(){$rootScope.hideLoading()})
		    return d.promise;
        }

	return{ 
	  	postID : function(ID){
		    var d =$q.defer()
		    var data = {ID:ID} 
		    POST("IDEvaluation",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	postPhoneNumber : function(phoneNumber,email,ID){
		    var d =$q.defer()
		    var data = {phoneNumber:phoneNumber,email:email,ID:ID} 
		    POST("updatePhoneNumber",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	validatePhoneNumber : function(phoneNumber,smsCode,ID){
		    var d =$q.defer()
		    var data = {phoneNumber:phoneNumber,
		    			smsCode:smsCode,
		    			ID:ID
		    			} 
		    POST("validatePhoneNumber",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	studentChoosePassword : function(password,ID){
		    var d =$q.defer()
		    var data = {hashedPassword:password,ID:ID} 
		    POST("studentChoosePassword",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	masterChoosePassword : function(password,masterActivationCode,ID){
		    var d =$q.defer()
		    var data = {hashedPassword:password,
		    			masterActivationCode:masterActivationCode,
		    			ID:ID
		    		   } 
		    POST("masterChoosePassword",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	test : function(data){
		    var d =$q.defer()
		    POST("test2",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	},
	  	login : function(username,password){
		    var d =$q.defer()
		    var data={username:username,password:password}
		    POST("login",data).then(function(res){
		      d.resolve(res);
		    },function(err,test){
		      d.reject(err);
		    })
		    return d.promise 
	  	}
    }
}])
