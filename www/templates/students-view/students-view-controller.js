angular.module('view-controllers')

.controller('StudentsViewCtrl',['$rootScope','$scope','$stateParams','$timeout','$ionicFilterBar','GPSS','ServerComS',
	       function($rootScope,$scope,$stateParams,$timeout,$ionicFilterBar,GPSS,ServerComS){

	//$scope.$on('$ionicView.beforeEnter',function(){
		
		$scope.course = $rootScope.currentCourse
	    $rootScope.showLoading() 
		$scope.refreshStudents()
	//})
	
  $scope.isAttended = function(student){
  	var result = false
  	angular.forEach(student.attendanceCredits, function(val,key){ 
         if(val.attendance==$stateParams.attendanceId)
          result = true
  	})

  	return result
  }

  $scope.refreshStudents = function(){
	    ServerComS.getStudentsByCourseId($scope.course._id).then(function(response){
	    	$scope.students = []
              response.data.forEach(function(student){
                 student.isAttended = $scope.isAttended(student)
                 $scope.students.push(student)
              })
	          $rootScope.currentCourse.populatedStudents = response.data
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
        filterProperties: ['fullName']
      })
    }


	$scope.masterAttendStudent = function(student){
		$rootScope.popups.masterAttendStudentConfirmation(student.fullName).then(function(res){
              if(res){
              	$rootScope.showLoading()
              	var date = new Date().toJSON().slice(0,19)
					ServerComS.masterAttendStudent(student._id,$stateParams.attendanceId,date).then(function(response){
				          console.log("masterAttendStudent -> ServerComS.masterAttendStudent response:"+response)
				          $scope.refreshStudents()          
					},function(err){
				               console.log(err)
					}).finally(function(){
							 $rootScope.hideLoading()
					})
              }
		},function(err){

		})
		
	}

}])