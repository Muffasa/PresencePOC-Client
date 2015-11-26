
angular.module('view-controllers')

.controller('LoginViewCtrl',['$q,$rootScope','$scope','$stateParams','ServerComs','PopupsS','NewRegS',
            function($q,$rootScope,$scope,$stateParams,ServerComs,PopupsS,NewRegS){
                $scope.isMaster = $rootScope.isMaster
    $scope.login = function (username,password){
        var d =$q.defer()

            
                NewRegS.login(username,password).then(function(res){
                    if(res.success){
                        AuthS.RegistrationCompeleteSingIn(res.userData).then(function(){
                            $state.go('app.home')
                        },function (err){
                            //TODO LOG ERROR
                            console.log("ChoosePasswordViewCtrl=>SubmitPassword=>NewRegS.studentChoosePassword error: "+err.message)
                        })   
                    }
                    else
                      PopupsS.show('The code you enterd is wrong. Try again','OK')  
                })            
            

        return d.promise
    }


}])                 