angular.module('view-controllers')

.controller('DesignPageCtrl',function($rootScope,$scope,$stateParams,$timeout,$ionicFilterBar,GPSS,ServerComS){

	$scope.$on('userInit',function(){
	    $rootScope.showLoading() 
		$scope.refreshStudents()
	})
	
  $scope.isAttended = function(student){
  	angular.forEach(student.attendanceCredits, function(key,val){
         if(val.attendnace==$stateParams.attandanceId)
          d.resolve()
  	})
  }

  $scope.refreshStudents = function(){
	    ServerComS.getStudentsByCourseId("561162e43d8a157b088fb67b").then(function(response){
	          $scope.students = response.data
		},function(err){
	               console.log(err)
		}).finally(function(){
				 $scope.$broadcast('scroll.refreshComplete')
				 $rootScope.hideLoading() 
		})

  }
   $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.students,
        update: function (filteredItems, filterText) {
          $scope.students = filteredItems
          if (filterText) {
            console.log(filterText)
          }
        },
        filterProperties: ['name']
      })
    }


	$scope.masterAttendStudent = function(student){
		masterAttendStudentConfirmation(student.fullName).then(function(res){
              if(res){
              	$rootScope.showLoading()
              	var date = new Date().toJSON().slice(0,19)
					ServerComS.masterAttendStudent(student._id,$stateParams.attandanceId,date).then(function(response){
				          console.log("masterAttendStudent -> ServerComS.masterAttendStudent response:"+response)          
					},function(err){
				               console.log(err)
					}).finally(function(){
							 $rootScope.hideLoading()
					})
              }
		},function(err){

		})
		
	}

})