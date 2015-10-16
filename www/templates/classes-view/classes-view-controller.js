angular.module('view-controllers')

.controller('ClassesViewCtrl',['$rootScope','$scope','$q','$stateParams','$ionicContentBanner','ServerComS',
           function($rootScope,$scope,$q,$stateParams,$ionicContentBanner,ServerComS){
	$scope.$on('$ionicView.enter',function(){
		$rootScope.showLoading()
      $scope.refreshAttendances().finally(function(){
        $rootScope.hideLoading()
      }) 
	})

$scope.refreshAttendances = function(){
	var d =$q.defer()
	    ServerComS.getClassesByCourseId($stateParams.eventId).then(function(response){
        $scope.classes = response.data
        $rootScope.currentCourse.populatedAttendances = response.data
        d.resolve()
	},function(err){
	               console.log(err)
                 var errorBannerClose = $ionicContentBanner.show({
                  autoClose:4000,
                  type:"error",
                  text:["an error occurred, please try again later"]
                })
                 d.reject()
		}).finally(function(){
				 $scope.$broadcast('scroll.refreshComplete')
		})
    return d.promise
  }
	
}])