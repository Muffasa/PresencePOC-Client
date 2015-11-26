
angular.module('view-controllers')

.controller('ChoosePasswordViewCtrl',['$q','$rootScope','$scope','$stateParams','PopupsS','NewRegS','AuthS',
            function($q,$rootScope,$scope,$stateParams,PopupsS,NewRegS,AuthS){
                $scope.isMaster = $rootScope.isMaster
    $scope.SubmitPassword = function (password,confirm,masterActivationCode){

        if(password!=confirm)
           return PopupsS.show('The passwords do not match.','OK') 

        var d =$q.defer()

            if(!$rootScope.isMaster){
                NewRegS.studentChoosePassword(password,$rootScope.userID).then(function(res){

                        AuthS.RegistrationCompeleteSingIn(res.userData).then(function(){
                                              $ionicHistory.nextViewOptions({
                                                disableBack: true
                                              })
                                              $ionicHistory.clearHistory()
                                              $state.go('app.home-view')
                        },function (err){
                            //TODO LOG ERROR
                            console.log("ChoosePasswordViewCtrl=>SubmitPassword=>NewRegS.studentChoosePassword error: "+err.message)
                        })   
                    
                 
                })           
            }
            else if($rootScope.isMaster&&masterActivationCode){
                NewRegS.masterChoosePassword(password,masterActivationCode,$rootScope.userID).then(function(res){
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
            }

        return d.promise
    }


}])                 