angular.module('view-controllers')

.controller('IDEnterViewCtrl',['$rootScope','$scope','ServerComs','PopupsS','NewRegS',
	        function($rootScope,$scope,ServerComs){
                
	$scope.$on('$ionicView.enter',function(){

	})

	$scope.submitID = function(ID){
		NewRegS.postID(ID).then(function(res){
            
            if(res.error){
            	//TODO LOG ERROR
            }
            else if(res.invalidID){
            	PopupsS.show("The ID is invalid. Try again")
            }
            else if(res.notRegistered){
            	PopupsS.show("The ID is not registered in the system, please make sure you have entered it correctly.")
            }
            else if(res.allreadyRegistered){
            	PopupsS.confirm("This ID is allready registered, are you sure its yours?",'Yes','No').then(function(firstButton){
                     if(firstButton){
                     	$state.go('regFlow.upload-ID-photo',{userBaseData:res.userBaseData})
                     	d.resolve()
                     }
            	})
            }
            else if(res.noPhoneNumber){
            	PopupsS.confirm("This ID has no Phone number, would you like to attach?",'Yes','No').then(function(firstButton){
                     if(firstButton){
                     	$state.go('regFlow.attach-phone',{userBaseData:res.userBaseData})
                     	d.resolve()
                     }
            	})
            }
            else if(res.smsSent){
            	$state.go('regFlow.SMS-validation',{userBaseData:res.userBaseData})
            }



			$rootScope.userBaseData = res.userBaseData
		})
	}

}]) 