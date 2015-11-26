angular.module("PresencePOC")

.run(['$rootScope','$ionicPlatform','$state','$timeout','AuthFlowS','AuthS','ServerComS',
     function($rootScope,$ionicPlatform,$state,$timeout,AuthFlowS,AuthS,ServerComS){

    $rootScope.serverUrl= 'https://node-dev-env1-muffasa.c9users.io:8080/'
   //AuthS.cleanLocalStorage()

   $ionicPlatform.ready(function(){
   
    $rootScope.settingsRadius = 50
    $rootScope.settingsUpTime = 15 
    // $state.go('work-space')

      $timeout(function() {

       /*if(!$rootScope.noInit){
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
       }*/
            if(localStorage.authToken && localStorage.uid){
              ServerComS.testCredentials(localStorage.authToken,localStorage.uid)
              .then(function(res){
                if(res.success) 
                  $state.go('app.home')

                    //TODO, credentials needs to update

              },function(err){
                console.log('init testCredentials faild, err: '+err.message)
                $state.go('regFlow.login')
              })
            }else{
              $state.go('regFlow.ID-enter')
            }
      }, 1000);



        

  
  
   })

}])