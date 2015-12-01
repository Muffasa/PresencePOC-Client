angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CalendareCtrl', function($scope) {
    $scope.$on('$ionicView.enter',function(){
      $scope.$broadcast('init-calendare')
    })
      var weekDaysList = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    var monthList = ["Январь", "Февраль", "Март", "Апрель", "Май", "Иннь", "Июль", "Август", "Сентябрь", "Октяборь", "Ноябрь", "Декабрь"];
    
      $scope.datepickerObject = {
      templateType: 'MODAL', // POPUP | MODAL
      header: "Select Dates",
      headerClass: "royal-bg light",
      btnsIsNative: false,
      btnOk: 'OK',
      btnOkClass: 'button-clear cal-green',
      btnCancel: 'Cancel',
      btnCancelClass: 'button-clear button-dark',
      btnTodayShow: true,
      btnToday: 'Today',
      btnTodayClass: 'button-positive',
      btnClearShow: false,
      btnClear: 'Clear',
      btnClearClass: 'button-royal',
      selectType: 'PERIOD', // SINGLE | PERIOD | MULTI
      accessType: 'WRITE', // READ | WRITE
      errorLanguage: 'RU', // EN | RU
      selectedDates: $scope.selectedDates,
      viewMonth: $scope.selectedDates, 
      /*disabledDates: disabledDates,
      holidays: holidays,
      calendar1: holidays,
      calendar1Class: '',
      calendar2: calendar,
      calendar2Class: '',
      calendar3: calendar,
      calendar3Class: '',
      calendar4: calendar,
      calendar4Class: 'cal-color-black',
      calendar5: calendar,
      calendar5Class: '',
      calendar6: calendar,
      calendar6Class: '',
      calendar7: calendar,
      calendar7Class: '',*/
      conflictSelectedDisabled: 'DISABLED', // SELECTED | DISABLED
      closeOnSelect: false,
      mondayFirst: false,
      //weekDaysList: weekDaysList,
      //monthList: monthList,
      modalHeaderColor: 'bar-positive',
      modalFooterColor: 'bar-positive',
      callback: function (dates) {  
        retSelectedDates(dates);
      }
    };  
        var retSelectedDates = function (dates) {
      $scope.selectedDates.length = 0;
      for (var i = 0; i < dates.length; i++) {
        $scope.selectedDates.push(angular.copy(dates[i]));
      }
    }; 
});
