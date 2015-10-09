angular.module('view-controllers')

.controller('SettingsViewCtrl',function($rootScope,$scope){
	$rootScope.$on('userInit',function(){
			
	})

    $scope.updateRadius = function(radius){
    	$rootScope.settingsRadius = radius
    }
    $scope.updateUpTime = function(upTime){
    	$rootScope.settingsUpTime = upTime
    }

}) 