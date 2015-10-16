angular.module("GPS-service",[])

.run(function($rootScope){
	
})
.factory("GPSS",['$q',function($q){
	document.addEventListener("deviceready", init, false);

  
  var isActive =function(){
			var d =$q.defer();

            Diagnostic.isLocationEnabledSetting(function(success){
			      success==0? d.resolve(false):d.resolve(true);
			    },function(error){
			      d.reject(error);
			    })

				return d.promise;
		};
  var goToSettings =function(){

			Diagnostic.switchToLocationSettings(function(success){console.log("worked, where it goes back to? this is success anyways:" +success)},function(error){console.log(error)});
		};
  function init () {
  	 isActive = function(){
			var d =$q.defer();

            Diagnostic.isLocationEnabledSetting(function(success){
			      success==0? d.resolve(false):d.resolve(true);
			    },function(error){
			      d.reject(error);
			    })

				return d.promise;
		};
	 goToSettings = function(){

			Diagnostic.switchToLocationSettings(function(success){console.log("worked, where it goes back to? this is success anyways:" +success)},function(error){console.log(error)});
		};
  }


	return {
		isActive:isActive,
		goToSettings:goToSettings
	}
}])
.factory("LocationS",['$q','$cordovaGeolocation','$ionicLoading',
	     function($q,$cordovaGeolocation,$ionicLoading){

		document.addEventListener("deviceready", init, false);


var getCurrentLocation = function(){
			var d =$q.defer();

            var options = {			
			enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
			};
                     $ionicLoading.show({
				            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location...'
				        });
		            $cordovaGeolocation.getCurrentPosition(options).then(
		            	
					function(position) {
						$ionicLoading.hide();
					var location={
						lat:position.coords.latitude,
						lng:position.coords.longitude,
					}
					d.resolve(location);
					},function(error){
						$ionicLoading.hide();
						d.reject(error);
					});

					return d.promise;
		};
  function init () {
  	 getCurrentLocation = function(){
			var d =$q.defer();

            var options = {			
			enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
			};
                     $ionicLoading.show({
				            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location...'
				        });
		            $cordovaGeolocation.getCurrentPosition(options).then(
		            	
					function(position) {
						$ionicLoading.hide();
					var location={
						lat:position.coords.latitude,
						lng:position.coords.longitude,
					}
					d.resolve(location);
					},function(error){
						$ionicLoading.hide();
						d.reject(error);
					});

					return d.promise;
		}

  }
	return {
		getCurrentLocation:getCurrentLocation
	}
}])


       
