angular.module('new-registartion-service', [])

.factory("NewRegS",["$rootScope","$q","$http",
 function($rootScope,$q,$http){
		//var baseUrl = 'http://46.101.206.21:8080/'
		var baseUrl = $rootScope.serverUrl

        var POST = function(action,data){
        	var d =$q.defer();

			$http.post(baseUrl+action,data).then(function(res){
			//	console.log('postID POST res:'+JSON.stringify(res))
			     d.resolve(res);
			    },function(err){
			    	console.log('server responded with error:'+err)
			      d.reject(err);
			    })
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
	  	postPhoneNumber : function(phoneNumber){
		    var d =$q.defer()
		    var data = {phoneNumber:phoneNumber} 
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
    }
}])