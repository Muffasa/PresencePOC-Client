
angular.module('view-controllers')

.controller('SMSValidationViewCtrl',['$q,$rootScope','$scope','$stateParams','ServerComs','PopupsS',
            function($q,$rootScope,$scope,$stateParams,ServerComs,PopupsS){
                
    $scope.SubmitSMSCode = function (SMSCode,authCode,email){
        var d =$q.defer()
        
        var userBaseData = $stateParams.submitIDRes.userData

            if(userBaseData.clientType == 'student'){
                ServerComS.sumbmitSMSCode(SMSCode).then(function(res){
                    if(res.success){
                        AuthS.createAuthSession(res.token).then(function(currentUser){
                            $state.go('app.home')
                        },function (err){
                            //TODO LOG ERROR
                        })   
                    }
                    else
                      PopupsS.show('The code you enterd is wrong. Try again','OK')  
                }            
            }
            else if (userBaseData.clientType == 'master'){
               ServerComS.submitSMSCodeMaster(SMSCode,authCode,email).then(function(res){
                if(res.success){
                    AuthS.createAuthSession(res.token).then(function(currentUser){
                        $state.go('app.home')
                    },function (err){
                        //TODO LOG ERROR
                    })   
                }else{
                    var message = res.wrongSMSCode? 'The code you enterd is wrong. Try again':'The authintication Code is wrong'
                    PopupsS.show(message,'OK')
                }
               })
            }



            },function(err){
                //TODO LOG ERROR
            })


        return d.promise
    }

}])                 