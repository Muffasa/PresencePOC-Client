//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

// forked and edited by Denni Adam - dennila2@gmail.com
// https://github.com/dennila2
(function(){
  'use strict';

  angular.module('ionic-multi-date-picker')
    .service('IonicMultiDatePickerService',IonicMultiDatePickerService);

  IonicMultiDatePickerService.$inject = [];
  function IonicMultiDatePickerService(){
    this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    /**
     * Get years list
     */

    this.getYearsList = function(from, to){
      var yearsList = [],
          minYear   = 1900,
          maxYear   = 2100;

      if(from){
        minYear = new Date(from).getFullYear();
      }

      if(to){
        maxYear = new Date(to).getFullYear();
      }

      for (var i = minYear; i <= maxYear; i++) {
        yearsList.push(i);
      }

      return yearsList;
    };
  }

})();