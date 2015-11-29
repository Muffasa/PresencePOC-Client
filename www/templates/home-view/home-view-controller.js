angular.module('view-controllers')

.controller('HomeViewCtrl',function($rootScope,$scope,$stateParams,$timeout,$ionicFilterBar,GPSS,ServerComS){

    
   $scope.spinIt = function(){
   	$scope.spin = true
   	$timeout(function(){
   		$scope.spin = false
   	},3000)
   }

})