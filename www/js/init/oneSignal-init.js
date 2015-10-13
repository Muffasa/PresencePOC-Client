angular.module("PresencePOC")

.run(function($ionicPlatform,$rootScope,$state,ServerComS){
   var init = function(){
        // Enable to debug issues.
      // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      
      var notificationOpenedCallback = function(jsonData) {
        if(jsonData.additionalData.actionSelected=="attendButton"){
           $state.go('app.class-view',{attendanceId:jsonData.additionalData.attendanceId,fromNotification:true})
        }
        $rootScope.noInit = true
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        
      };

      window.plugins.OneSignal.init("e98d2b3c-57f1-11e5-b578-83149ca42b15",
                                     {googleProjectNumber: "427416898756",
                                      autoRegister: true},
                                     notificationOpenedCallback);
      
      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(false);

      window.plugins.OneSignal.enableVibrate(true);
      window.plugins.OneSignal.enableSound(true);
      window.plugins.OneSignal.enableNotificationsWhenActive(true);

      window.plugins.OneSignal.setSubscription(true);

      window.plugins.OneSignal.getIds(function(ids) {
        console.log('getIds: ' + JSON.stringify(ids));
      });
      window.plugins.OneSignal.getTags(function(tags) {
        console.log('Tags Received: ' + JSON.stringify(tags));
      });
   }



   document.addEventListener('deviceready', function () {
  
    init();
    //window.plugins.OneSignal.deleteTags(["uid", "ID" , "phoneNumber" ]);

    $rootScope.$on("mainUserInitialized",function(){

      window.plugins.OneSignal.sendTags({uid: $rootScope.mainUser.uid,
                                         ID: $rootScope.mainUser.ID,
                                         phoneNumber:$rootScope.mainUser.phoneNumber});

    })

}, false);



})