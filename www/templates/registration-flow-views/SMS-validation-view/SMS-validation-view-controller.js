
angular.module('view-controllers')

.controller('SMSValidationViewCtrl',['$q','$rootScope','$scope','$state','PopupsS','NewRegS',
            function($q,$rootScope,$scope,$state,PopupsS,NewRegS){
                
    $scope.SubmitSMSCode = function (SMSCode){
        var d =$q.defer()
        

                NewRegS.validatePhoneNumber(SMSCode,$rootScope.userID).then(function(res){
                    if(res.success){
                        $rootScope.isMaster = res.isMaster 
                        $state.go('regFlow.choose-password')     
                    }
                    else
                      PopupsS.show('The code you enterd is wrong. Try again','OK')  
                },function(err){
                    //if(err.wrongSMS)
                    PopupsS.show('The code you enterd is wrong. Try again','OK')
                    //else
                })            


        return d.promise
    }

}])                 