angular.module("user-service",[])

.factory("UserS",function($rootScope,$q,ServerComS){

    $rootScope.mainUser = {}

    if(window.localStorage.getItem("MPN"))
    	$rootScope.mainUser.MPN = window.localStorage.getItem("MPN")

	var initUser = function(params){
	  $rootScope.mainUser=params
	  $rootScope.$broadcast("^mainUser-set")
	}
    var getUserData = function(uid,authToken){
      var d = $q.defer()
    	ServerComS.getUserCredentialsByAuth({uid:uid,authToken:authToken}).then(function(respond){
    		$rootScope.mainUser = respond.data
            $rootScope.userType = respond.data.authToken.length > 42? 'master':'student'
    		console.log("user data updated successfuly")
    		d.resolve()
    	},function(err){
    		d.reject(err)
    	})
       return d.promise	
    }
	return{
		initUser:initUser,
		getUserData:getUserData
	}

})