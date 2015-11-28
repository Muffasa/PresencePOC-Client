angular.module('view-controllers')

.controller('AttachPhoneViewCtrl',['$rootScope','$scope','$state','PopupsS','NewRegS',
	        function($rootScope,$scope,$state,PopupsS,NewRegS){
                
	$rootScope.$on('userInit',function(){
			
	})


	$scope.submitPhone = function(form){
		if(!form.$valid)
			return
        NewRegS.postPhoneNumber(form.newPhoneNumber.$viewValue,form.email.$viewValue,$rootScope.userID).then(function(res){
			if(res.smsSent){
				$state.go('regFlow.SMS-validation',{newPhoneNumber:form.newPhoneNumber.$viewValue})
			}
			else if(res.wrongEmail){
				PopupsS.show('Wrong Email provided, this will be reported','OK')
			}
			else if(res.error){
				PopupsS.show('Failed to attach the phone number to the requested ID.','OK')
			}
		},function(err){
			PopupsS.show(err.message)
		})

	}

}]) 