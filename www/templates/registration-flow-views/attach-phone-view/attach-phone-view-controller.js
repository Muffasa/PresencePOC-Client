angular.module('view-controllers')

.controller('AttachPhoneViewCtrl',['$rootScope','$scope','PopupsS','NewRegS',
	        function($rootScope,$scope,PopupsS,NewRegS){
                
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