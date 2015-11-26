angular.module("PresencePOC")

.run(['$rootScope','$ionicPlatform','$state','$timeout','AuthFlowS','AuthS','ServerComS','UserS','$ionicHistory',
     function($rootScope,$ionicPlatform,$state,$timeout,AuthFlowS,AuthS,ServerComS,UserS,$ionicHistory){

    
   //AuthS.cleanLocalStorage()

   $ionicPlatform.ready(function(){
    $rootScope.serverUrl= 'https://node-dev-env1-muffasa.c9users.io:8080/'
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
                if(res.data.success){
                  $rootScope.authToken=localStorage.authToken
                  $rootScope.uid =localStorage.uid
                  UserS.getUserData().then(function(){
                        $ionicHistory.nextViewOptions({
                          disableBack: true
                        })
                        $ionicHistory.clearHistory()
                        $state.go('app.home-view')
                  })

                } 
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