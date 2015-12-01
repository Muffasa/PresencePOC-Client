
angular.module('view-controllers')

.controller('LoginViewCtrl',['$q','$rootScope','$scope','$state','PopupsS','NewRegS','AuthS','$ionicHistory',
            function($q,$rootScope,$scope,$state,PopupsS,NewRegS,AuthS,$ionicHistory){
                $scope.isMaster = $rootScope.isMaster

                $scope.$on('ionicView.beforeEnter',function(){
                    $scope.username = ""
                    $scope.password = ""
                })
                
    $scope.login = function (username,password){
        var d =$q.defer()

            
                NewRegS.login(username,password).then(function(res){
                    if(res.success){
                        AuthS.RegistrationCompeleteSingIn(res.userData).then(function(){
                                              $ionicHistory.nextViewOptions({
                                                disableBack: true
                                              })
                                              $ionicHistory.clearHistory()
                                              $ionicHistory.clearCache()
                                              $state.go('app.home-view')
                        },function (err){
                            //TODO LOG ERROR
                            console.log("ChoosePasswordViewCtrl=>SubmitPassword=>NewRegS.studentChoosePassword error: "+err.message)
                        })   
                    }
                    else
                      PopupsS.show('Wrong password. Try again','OK')  
                })            
            

        return d.promise
    }


}])                 