angular.module("register-controllers",[])

.controller('WelcomeCtrl',['$q','$rootScope','$scope','$state','$ionicHistory','RegisterS','AuthS','ServerComS', 
            function($q,$rootScope,$scope,$state,$ionicHistory,RegisterS,AuthS,ServerComS) {

$scope.devMasterLogin = function(){
AuthS.devAuth(true)
}
$scope.devStudentLogin = function(){
AuthS.devAuth(false)
}
$scope.clearLocalStorage = function(){
AuthS.cleanLocalStorage()
}
$scope.goToWelcomeLogin = function(){
$state.go('welcome.login')
}
$rootScope.tempUser={}

  $scope.phoneEnter = function(number){ 

      $rootScope.showLoading();
        if(!validPhoneNumber(number)){
          $rootScope.hideLoading();
          $rootScope.popups.invalidPhoneNumber().then(function(res){
            $scope.phoneNumber = "";
          })
        }else{
          
        	$rootScope.tempUser.MPN = {
                        phoneNumber:String(number),
                        countryCode:"IL"
              };

          RegisterS.sendPhoneNumberToServer($rootScope.tempUser).then(function(res){
            $rootScope.hideLoading()
             if(res.data=="Success! sms code generated"){
              
                    $state.go("welcome.sms-code")
            }
          },function (err){
            $rootScope.hideLoading()
              console.log(err)
              //if(err.status==422){// wiers bug on server err is undefind
                 $rootScope.popups.phoneNumberExist().then(function(res){
                   $scope.phoneNumber = ""
                  })
             // }else{
               // $rootScope.popups.serverError()
             // }

              
          })
        }


      
    }
    
    var validPhoneNumber = function(Pnumber){
      var number = String(Pnumber)
      return number[0]=="0"&&number[1]=="5"&&number.length==10
    }

    $scope.IDEnter = function(id){ 

      $rootScope.showLoading();
        if(!validPhoneNumber(number)){
          $rootScope.hideLoading();
          $rootScope.popups.invalidPhoneNumber().then(function(res){
            $scope.phoneNumber = "";
          })
        }else{
          
          $rootScope.tempUser.MPN = {
                        phoneNumber:String(number),
                        countryCode:"IL"
              };

          RegisterS.sendPhoneNumberToServer($rootScope.tempUser).then(function(res){
            $rootScope.hideLoading()
             if(res.data=="Success! sms code generated"){
              
                    $state.go("welcome.sms-code")
            }
          },function (err){
            $rootScope.hideLoading()
              console.log(err)
              //if(err.status==422){// wiers bug on server err is undefind
                 $rootScope.popups.phoneNumberExist().then(function(res){
                   $scope.phoneNumber = ""
                  })
             // }else{
               // $rootScope.popups.serverError()
             // }

              
          })
        }


      
    }
    var validPhoneNumber = function(Pnumber){
      var number = String(Pnumber)
      return number[0]=="0"&&number[1]=="5"&&number.length==10
    }

    $scope.smsValidation = function(code){

      $rootScope.showLoading();
          RegisterS.validateSmsCode($rootScope.tempUser,String(code)).then(function(res){
            $rootScope.hideLoading()
             if(res.data=="temp user now validated"){
        	   $rootScope.mainUser.MPN = $rootScope.tempUser.MPN
                    $state.go("welcome.signup")
            }
          },function (err){
            $rootScope.hideLoading()
              console.log(err)
              if(err == "wrong sms code"){
                 $rootScope.popups.wrongSmsCode().then(function(res){
                  $scope.smsCode = ""
                 })
              }else{
                $rootScope.popups.serverError()
              }     
          })
    } 
    $scope.Register = function(){
      $rootScope.showLoading()
      registerFormValidation().then(function(){
        
            ServerComS.sendIDToServer($scope.tempUser.ID).then(function(res){
                 var isMaster = res.data
                if(isMaster)
                {
                  if(!$scope.showActivationCodeInput){
                    $rootScope.popups.masterIDRcognized().then(function(res){
                     $scope.showActivationCodeInput = true
                      },function(err){
                         
                      })
                  }
                  else{
                    masterRegister()
                  }
                }
                else
                  studentRegister()
            },function(err){
              if(err.data == "ID do not exist")
                $rootScope.popups.IDDoNotExist().then(function(res){

                  },function(err){
                     
                  })
            })
       
      },function(err){
         
      }).finally(function(){
        $rootScope.hideLoading()
      })

      

    }


    var registerFormValidation = function(){
      var d= $q.defer()

        if(String($scope.tempUser.ID).length != 9){
          $rootScope.hideLoading()
          $rootScope.popups.IDValidationFail().then(function(res){
            d.reject()
          })
         }
         else if( $scope.tempUser.password.length < 8){
          $rootScope.hideLoading()
          $rootScope.popups.passwordToShort().then(function(res){
            $scope.tempUser.password =""
            $scope.tempUser.confirmPassword=""
            d.reject()
          })
        } 
        else if( $scope.tempUser.password != $scope.tempUser.confirmPassword){
          $rootScope.hideLoading()
          $rootScope.popups.passwordsDoNotMatch().then(function(res){
            $scope.tempUser.password =""
            $scope.tempUser.confirmPassword=""
            d.reject()
          })
        }
        else d.resolve()  
        
      return d.promise
    }
    var studentRegister = function(){

          
          RegisterS.createStudentUser($scope.tempUser).then(function(res){
            $rootScope.hideLoading()
             $rootScope.popups.youHaveRegistered().then(function(res){
              $ionicHistory.nextViewOptions({
                  disableBack: true
              })
              $ionicHistory.clearHistory()
                $state.go('app.home-student')
             })
          },function (err){
            $rootScope.hideLoading()
              console.log(err)
              if(err.data.errmsg.indexOf('ID') > 0){
                 
                  $rootScope.popups.registerFaild(err).then(function(res){
                    $scope.tempUser.fullName=""
                    $scope.tempUser.ID=""
                    $scope.tempUser.password=""
                    $scope.tempUser.confirmPassword=""
                  })
                  
              }else{
                $rootScope.popups.serverError() 
              }     
          })
    }

    var masterRegister = function(){


          RegisterS.createMasterUser($scope.tempUser).then(function(res){
            $rootScope.hideLoading()
             $rootScope.popups.youHaveRegistered().then(function(res){
              $ionicHistory.nextViewOptions({
                  disableBack: true
              })
              $ionicHistory.clearHistory()
                $state.go('app.home-master')
             })
          },function (err){
            $rootScope.hideLoading()
              console.log(err)
              if(err.status==422){
                 $rootScope.popups.registerFaild().then(function(res){
                  $scope.tempUser.fullName=""
                  $scope.tempUser.ID=""
                  $scope.tempUser.password=""
                  $scope.tempUser.confirmPassword=""
                 })
              }else{
                $rootScope.popups.serverError()
              }     
          })
    }


}])

.controller('LoginCtrl',['$rootScope','$scope','$state','AuthS',
            function($rootScope,$scope,$state,AuthS){
  $scope.login = function(){
    $rootScope.showLoading()
    var MPN = {
      phoneNumber:$scope.phoneNumber,
      countryCode:'IL'
    }
    AuthS.login(MPN,$scope.password).then(function(clientType){
            console.log('login success')
        },function(err){
          $rootScope.popups.loginFaild().then(function(res){
            $scope.phoneNumber = ""
            $scope.password = ""
          })
        }).finally(function(){$rootScope.hideLoading()})
  }
}])

