angular.module("PresencePOC")

.run(['$rootScope','$ionicPlatform','$state','$timeout','AuthFlowS','AuthS','ServerComS',
     function($rootScope,$ionicPlatform,$state,$timeout,AuthFlowS,AuthS,ServerComS){

   //AuthS.cleanLocalStorage()

   $ionicPlatform.ready(function(){
   
    $rootScope.settingsRadius = 50
    $rootScope.settingsUpTime = 15 
     $state.go('work-space')

     /* $timeout(function() {

       if(!$rootScope.noInit){
        AuthS.auth().then(function(){
            console.log('auth success, redirecting courses page')
        },function(err){
          console.log('failed to auth, redirecting to login page')
         // if(AuthFlowS.isFirstTime())
            $state.go('welcome.phone-enter')
          //else
           //$state.go('welcome.login')            
        }).finally(function(){
          navigator.splashscreen.hide()
        })
       }

      }, 100);*/

        

  
  
   })

}])