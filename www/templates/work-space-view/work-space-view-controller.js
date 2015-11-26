angular.module('view-controllers')

.controller('WorkSpaceCtrl',['$rootScope','$scope','NewRegS',
	        function($rootScope,$scope,NewRegS){
                
	$rootScope.$on('userInit',function(){
			
	}) 
	$scope.isMaster = false

	/*$scope.test = function(){
       NewRegS.postID('201587755').then(function(res){
       	console.log(res)
       },function(err){
       	console.log(err)
       })
	}*/
	$scope.test = function(){
       NewRegS.test({data:'201587755'}).then(function(res){
       	console.log(res)
       },function(err){
       	console.log(err)
       })
	}

}]) 