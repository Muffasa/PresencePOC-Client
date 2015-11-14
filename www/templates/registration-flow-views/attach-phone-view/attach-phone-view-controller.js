angular.module('view-controllers')

.controller('AttachPhoneCtrl',['$rootScope','$scope','ServerComs','PopupsS',
	        function($rootScope,$scope,$stateParams,ServerComs,PopupsS){
                
	$rootScope.$on('userInit',function(){
			
	})

	var $scope.userData = {}
	$scope.userData.ID=$stateParams.ID

	$scope.attachPhone = function(phoneNumber,email){
		ServerComs.attachPhoneNumberToID($stateParams.ID,phoneNumber,email).then(function(res){
			if(res.success){
				$state.go('regFlow.SMS-validation')
			}
			else{
				PopupsS.show('Failed to attach the phone number to the requested ID.','OK')
			}
		})
	}

}]) 