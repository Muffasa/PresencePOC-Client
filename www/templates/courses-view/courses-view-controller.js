angular.module('view-controllers')

.controller('CoursesViewCtrl',function($rootScope,$scope,$stateParams,$ionicContentBanner,$ionicFilterBar,ServerComS){
	    
  $scope.$on('$ionicView.beforeEnter',function(){
     $rootScope.showLoading()
		   $scope.refreshEvents()
	   })

       
   $scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.events,
        update: function (filteredItems, filterText) {
          $scope.events = filteredItems
          if (filterText) {
            console.log(filterText)
          }
        },  
        filterProperties: ['name']
      })
    }
  $scope.refreshEvents = function(){
	    ServerComS.getEventsById($rootScope.mainUser._id).then(function(response){
	          $scope.events = response.data

		},function(err){
	               console.log(err)
                 var errorBannerClose = $ionicContentBanner.show({
                  autoClose:4000,
                  type:"error",
                  text:["an error occurred, please try again later"]
                })
		}).finally(function(){
				 $scope.$broadcast('scroll.refreshComplete')
         $rootScope.hideLoading()
		})

  }





})