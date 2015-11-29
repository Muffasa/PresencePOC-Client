angular.module("PresencePOC")

.run(['$rootScope','$ionicPlatform','$state','$timeout','AuthFlowS','AuthS','ServerComS','UserS','$ionicHistory',
     function($rootScope,$ionicPlatform,$state,$timeout,AuthFlowS,AuthS,ServerComS,UserS,$ionicHistory){

    
   //AuthS.cleanLocalStorage()

   $ionicPlatform.ready(function(){
    $rootScope.serverUrl= 'https://node-dev-env1-muffasa.c9users.io:8080/'
    $rootScope.settingsRadius = 50
    $rootScope.settingsUpTime = 15 
     //return $state.go('work-space')

      $timeout(function() {


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
              }).finally(function(){
                navigator.splashscreen.hide()
              })
            }else{
              $state.go('regFlow.ID-enter')
              navigator.splashscreen.hide()
            }
      }, 1000);



        

  
  
   })

}])