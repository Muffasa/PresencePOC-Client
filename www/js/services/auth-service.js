angular.module("auth-service",[])

.factory("AuthFlowS",function($rootScope){
	 var isFirstTime = function(){
	 	return !window.localStorage.getItem("MPN")         
	 }

	 var isRegistered = function(){
	 	return window.localStorage.getItem("fullName")&&window.localStorage.getItem("ID")
	 }

	 var isLoggedIn = function(){
	 	return window.localStorage.getItem("authToken")&&window.localStorage.getItem("uid")
	 }

	 return{
	 	isFirstTime:isFirstTime,
	 	isRegistered:isRegistered,
	 	isLoggedIn:isLoggedIn
	 }
   

})

.factory("AuthS",function($rootScope,$q,$state,$ionicHistory,ServerComS,UserS){
	var d = $q.defer()
	 var login = function(MPN,password){
                ServerComS.getUserCredentials(MPN,password).then(function(res){
		 		console.log("User got credentials from the server:" +  res.data)
		 		window.localStorage.setItem('uid',res.data.uid)
	            window.localStorage.setItem('authToken',res.data.authToken)
		 		UserS.getUserData(res.data.uid,res.data.authToken).then(function(){
		 			$ionicHistory.nextViewOptions({
			              disableBack: true
			          })
			        $ionicHistory.clearHistory()
		 			$state.go('app.courses-view')
                       d.resolve()

		 		},function(err){
                   d.reject(err)
		 		})
		 	},function(err){
		 		d.reject(err)
		 	})
                return d.promise
	 }
	 var auth = function(){
	 	var d =$q.defer()
	 	
	 		ServerComS.getUserCredentialsByAuth(window.localStorage.getItem('uid'),window.localStorage.getItem('authToken')).then(function(res){
		 		console.log("User got credentials from the server:" +  res.data)
		 		UserS.getUserData(res.data.uid,res.data.authToken).then(function(){
		 			$ionicHistory.nextViewOptions({
			              disableBack: true
			          })
			          $ionicHistory.clearHistory()
		 			$state.go('app.courses-view')
                       d.resolve()
		 		},function(err){
                   d.reject(err)
		 		})
		 		
		 	},function(err){
		 		d.reject(err)  
		 	})
	 	
	 	
	 	return d.promise
	 }
 
	 var unAuth = function(){
	 	    window.localStorage.removeItem('authToken')
	 		window.localStorage.removeItem('uid')
	 }
	 var cleanLocalStorage = function(){
	 	    window.localStorage.removeItem('MPN')
	 		window.localStorage.removeItem('fullName')
	 		window.localStorage.removeItem('clientType')
	 		window.localStorage.removeItem('authToken')
	 		window.localStorage.removeItem('uid')
	 }

	 var devAuth = function(isMaster,keepState){
	 	var d =$q.defer()
		var authData=isMaster? {
		       uid:"n28e3bNN36Vq11zQ", 
		       authToken: "06HeTrnDAhZvYah2aLD3e1FiThM7bbRpLLnkCRRAiiZGvqipqYTeTc"
		    }:{
		       uid:"qsRvS31KpDrHmRfj", 
		       authToken: "9V34HAMmeDPpw554sl3OqiWadH6romYbWwbfKYoQsV"
		    }    
    
		  ServerComS.getUserCredentialsByAuth(authData).then(function(respond){
		    $rootScope.mainUser = respond.data
		    respond.data.authToken.length>42? $rootScope.userType = 'master':$rootScope.userType = 'student'
		    $rootScope.$broadcast('userInit')
		      if(!keepState) $state.go('app.courses-view')
		      d.resolve()  
		  },function(err){
		    d.reject(err)
		  })
	 	    return d.promise
	 }


	 return{
	 	auth:auth,
	 	unAuth:unAuth,
	 	cleanLocalStorage:cleanLocalStorage,
	 	devAuth:devAuth
	 }
   

})