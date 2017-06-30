  //Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function () {
'use strict';
var omsApp = angular.module('easysystemsServiceApp');
omsApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('watsonChat');
  // Now set up the states
  $stateProvider
  .state('watsonChat', {
      url: "/watsonChat",
      templateUrl: "views/chat.html"
    });
}]);
    
})();