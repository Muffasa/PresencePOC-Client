angular.module("PresencePOC")

.run(function($ionicPlatform,$ionicPopup,$ionicLoading,$ionicContentBanner,$rootScope,$q){
	$ionicPlatform.ready(function(){
		$rootScope.popups = {

		        GPSIsOff:function(){
		        	var d = $q.defer()
		        	$ionicPopup.confirm({
		                title: 'GPS off',
		                template: 'You have to turn on the GPS in order to continiue',
		                cancelText:'Cancel',
		                okText:'Turn on'
		              }).then(function(res){ 
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        invalidPhoneNumber:function(){
		        	var d = $q.defer()
		        	$ionicPopup.alert({
		            title:"Invalid phone number",
		            template:"The phone number you entered is invalid, please try again."
		          }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        phoneNumberExist:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Allready registered",
	                template:"The phone number you entered is allredy registered, please try again."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        wrongSmsCode:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
		                title:"Wrong SMS code",
		                template:"The code you entered is wrong, please try again."
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        phoneNumberExist:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Allready registered",
	                template:"The phone number you entered is allredy registered, please try again."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        passwordsDoNotMatch:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Unmached Passwords",
	                template:"The passwords and the confirmation do not match, please try again."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        passwordToShort:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"To Short Password",
	                template:"The password must contain atleast 8 chars."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        IDValidationFail:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Invalid ID",
	                template:"The ID must contain 9 digits, please try again."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        youHaveRegistered:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Registered!",
	                template:"You have successfuly registered."
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        registerFaild:function(text){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Registration Fail",
	                template:"Registration fail, "+text
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        loginFaild:function(){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Login Faild",
	                template:"Login faild, please try again"
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        faildToGetEvents:function(text){
		        	var d = $q.defer()
		        	  $ionicPopup.alert({
	                title:"Faild to load courses",
	                template:"could not retrive courses from the server, please try again later"
	              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        studentAttendSuccesfuly:function(){
		        	var d = $q.defer()
				  	  $ionicPopup.alert({
		                title:"Attended!",
		                template:"You have been successfuly attented to the class!"
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        attendanceFailed:function(){
		        	var d = $q.defer()
				  	  $ionicPopup.alert({
		                title:"Attendance Failed",
		                template:"You have failed to attend to the class, please try again"
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        },
		        masterAttendStudentConfirmation:function(studentName){
		        	var d = $q.defer()
				  	  $ionicPopup.confirm({
		                title:"Manual Attendance",
		                template:"Are you sure you want to attend "+studentName+" to this class?"
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise 
		        },
		        masterIDRcognized:function(){
		        	var d = $q.defer()
				  	  $ionicPopup.confirm({
		                title:"Master ID",
		                template:"This ID recognized as a master ID, please provide the matching activation code"
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise 
		        },
		        IDDoNotExist:function(){
		        	var d = $q.defer()
				  	  $ionicPopup.confirm({
		                title:"ID do not exist",
		                template:"The ID is not exist in the system, make sure you entered it correctly."
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise 
		        },
		        serverError:function(){
		        	var d = $q.defer()
				  	  $ionicPopup.alert({
		                title:"Server Error",
		                template:"Somthing went wrong, please try again later."
		              }).then(function(res){
		              	d.resolve(res)
		              },function(err){
		              	d.reject(err)
		              })
		        	return d.promise
		        }

		        


			}

		    $rootScope.showLoading = function(text) {
		      $rootScope.loading = $ionicLoading.show({
		       // template: text ? text : 'Loading...',
		        animation: 'fade-in',
		        showBackdrop: true,
		        maxWidth: 200,
		        showDelay: 0
		      });
		    };
		 
		 
		    $rootScope.hideLoading = function() {
		      $ionicLoading.hide();
		    };
		    $rootScope.banners ={
		    	test:function(){
		    		this.testClose = $ionicContentBanner.show({
					    		autoClose:6000,
					    		interval:3000,
					    		type:"success",
					    		text:["hello banners! going next in 3..","im next! bye bye in 3.."]
					    	})
		            },
		        testClose:{}    
            }
	})
	
})