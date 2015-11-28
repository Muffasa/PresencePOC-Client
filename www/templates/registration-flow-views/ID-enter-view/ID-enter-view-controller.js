angular.module('view-controllers')

.controller('IDEnterViewCtrl',['$rootScope','$scope','$state','PopupsS','NewRegS',
	        function($rootScope,$scope,$state,PopupsS,NewRegS){
                

	  $scope.submitID = function(form){
      if(!form.$valid)
         return 

      $rootScope.userID = form.ID.$viewValue
              NewRegS.postID(form.ID.$viewValue).then(function(res){
            
            if(res.error){
              //TODO LOG ERROR
            }
            else if(res.invalidID){
              PopupsS.show("The ID Number you provided do not exist. Try again")
            }
            else if(res.allreadyRegistered){
              PopupsS.confirm("This ID is allready used by another user, are you sure its yours?",'Yes','No').then(function(firstButton){
                     if(firstButton){
                            //$state.go('regFlow.upload-ID-photo',{userBaseData:res.userBaseData})
                        PopupsS.confirm("You can't use this ID in order to login, please upload a picture of your ID in order to resolve this issue","upload","cancel")
                        .then(function(firstButton){
                           //open camera
                        })
                            
                     }
              })
            }
            else if(res.noPhoneNumber){
              PopupsS.confirm("This ID have no phone number attached, you must update your phone number in order to continiue.",'update','cancel').then(function(firstButton){
                     if(firstButton){
                            $state.go('regFlow.attach-phone')
                            
                     }
              })
            }
            else if(res.smsSent){
              $state.go('regFlow.SMS-validation')
            }




                     
              })
       }
   $scope.goToWelcomeLogin = function(){
   $state.go('regFlow.login')
   }

}]) 