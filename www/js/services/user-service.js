angular.module("user-service",[])

.factory("UserS",['$rootScope','$q','ServerComS',
        function($rootScope,$q,ServerComS){

    $rootScope.mainUser = {}

    if(window.localStorage.getItem("MPN"))
    	$rootScope.mainUser.MPN = window.localStorage.getItem("MPN")

	var initUser = function(params){
	  $rootScope.mainUser=params
	  $rootScope.$broadcast("^mainUser-set")
	}
     var RegistrationCompeleteSingIn = function (userData){
      var d =$q.defer()
          window.localStorage.setItem("fullUserData",JSON.stringify(userData))
          window.localStorage.setItem("authToken",userData.authToken)
          window.localStorage.setItem("uid",userData.uid)
          $rootScope.authToken = userData.authToken
          $rootScope.uid = userData.uid
          $rootScope.isLoggedIn = true

          ServerComS.testCredentials($rootScope.authToken,$rootScope.uid).then(function(res){
            res.data.success? d.resolve():d.reject()
          },function(err){
            d.reject(err.message)
          })
      getUserData().then(function(){
                       d.resolve()
        },function(err){
                   d.reject(err)
        })
      return d.promise
    }
    var getUserData = function(uid,authToken){
      var d = $q.defer()
    	ServerComS.getUserCredentialsByAuth({uid:uid,authToken:authToken}).then(function(respond){
    		$rootScope.mainUser = respond.data
        $rootScope.userType = respond.data.authToken.length > 42? 'master':'student'
    		console.log("user data updated successfuly")
            $rootScope.$broadcast('mainUserInitialized')
    		d.resolve()
    	},function(err){
    		d.reject(err)
    	})
       return d.promise	
    }

    var clearUserData = function (){
         var d =$q.defer()
              window.localStorage.removeItem("fullUserData")
              window.localStorage.removeItem("authToken")
              window.localStorage.removeItem("uid")
              $rootScope.authToken = null
              $rootScope.uid = null
              $rootScope.isLoggedIn = false
          ServerComS.testCredentials().then(function(res){
            res.data.success? d.reject():d.resolve()
          },function(err){
            d.resolve()
          })
        return d.promise
     }

	return{
		initUser:initUser,
		getUserData:getUserData,
    clearUserData:clearUserData,
    RegistrationCompeleteSingIn
	}

}])