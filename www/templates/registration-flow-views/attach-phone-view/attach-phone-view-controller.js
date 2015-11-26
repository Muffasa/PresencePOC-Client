angular.module('view-controllers')

.controller('AttachPhoneCtrl',['$rootScope','$scope','ServerComs','PopupsS','NewRegS',
	        function($rootScope,$scope,$stateParams,ServerComs,PopupsS,NewRegS){
                
	$rootScope.$on('userInit',function(){
			
	})

	var $scope.userData = {}
	$scope.userData.ID=$stateParams.ID

	$scope.attachPhone = function(phoneNumber){
		NewRegS.postPhoneNumber(phoneNumber).then(function(res){
			if(res.success){
				$state.go('regFlow.SMS-validation')
			}
			else{
				PopupsS.show('Failed to attach the phone number to the requested ID.','OK')
			}
		})
	}

}]) 