angular.module('view-controllers')

.controller('AttachPhoneCtrl',['$rootScope','$scope','ServerComs','PopupsS','NewRegS',
	        function($rootScope,$scope,$stateParams,ServerComs,PopupsS,NewRegS){
                
	$rootScope.$on('userInit',function(){
			
	})


	$scope.attachPhone = function(phoneNumber,email){
		NewRegS.postPhoneNumber(phoneNumber,email,$rootScope.userID).then(function(res){
			if(res.success){
				$state.go('regFlow.SMS-validation')
			}
			else{
				PopupsS.show('Failed to attach the phone number to the requested ID.','OK')
			}
		},function(err){
			PopupsS.show(err.message)
		})
	}

}]) 