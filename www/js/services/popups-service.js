angular.module("popups-service",[])

.factory("PopupsS",['$rootScope','$q','$ionicPopup',
        function($rootScope,$q,$ionicPopup){

     var show = function(text,buText){
        var d = $q.defer()

                    $ionicPopup.alert({
                        title:'Message',
                        template: text,
                        okText:buText
                      }).then(function(res){ 
                        d.resolve(res)
                      },function(err){
                        d.reject(err)
                      })


                return d.promise
     }
     var confirm = function(text,bu1Text,bu2Text){
        var d = $q.defer()

                    $ionicPopup.confirm({
                        title:'Message',
                        template: text,
                        cancelText:bu2Text,
                        okText:bu1Text
                      }).then(function(res){ 
                        d.resolve(res)
                      },function(err){
                        d.reject(err)
                      })

                return d.promise
     }

    return{
        show:show,
        confirm:confirm

    }

}])