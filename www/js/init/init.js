angular.module("PresencePOC")

.run(function($rootScope,$ionicPlatform,$state,AuthFlowS,AuthS,ServerComS){

   //AuthS.cleanLocalStorage()

   $ionicPlatform.ready(function(){
   
    $rootScope.settingsRadius = 50
    $rootScope.settingsUpTime = 15
      
      //$state.go('welcome.phone-enter')
    /*  if(AuthFlowS.isFirstTime())
      	$state.go('welcome.phone-enter')
      else if(AuthFlowS.isRegistered){
       	AuthS.auth().then(function(clientType){
      		if(clientType.indexOf("student") > -1){
      			$state.go('app.home-student')
      		}else if(clientType.indexOf("master") > -1){
                $state.go('app.home-master')
      		}

          $ionicViewService.nextViewOptions({
              disableBack: true
          })
          $ionicViewService.clearHistory()
          clientType.indexOf("student")>-1? $state.go('app.home-student'):$state.go('app.home-master')
      	},function(err){ 
          $state.go('welcome.login')
        })
      }  */


        AuthS.auth().then(function(){
            console.log('auth success, redirecting courses page')
        },function(err){
          console.log('failed to auth, redirecting to login page')
          if(AuthFlowS.isFirstTime())
            $state.go('welcome.phone-enter')
          else
           $state.go('welcome.login')            
        }).finally(function(){
          navigator.splashscreen.hide()
        })

  
  
   })

})