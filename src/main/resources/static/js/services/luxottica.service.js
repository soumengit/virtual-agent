//Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function () {
    'use strict';
	//WO Split Results Service
	angular.module('luxotticaServiceApp')
		.factory('luxotticaServiceAppService', ['$http',
			function($http) {
				var viewFactory = {};
						
				
				 
				 viewFactory.firstTimeCall = function(){

				// alert('in first')
					 
					 var oPayload = {
		                    	'inputText' : ''
		                  };
					 var data = JSON.stringify(oPayload);				 
					// var contextRoot = 'https://localhost:8443/conversation/v1/processConversation';
					var contextRoot = 'http://luxottica-virtual-agent-v2.mybluemix.net/conversation/v1/processConversation';
					// var promise =  $http.get(contextRoot, {
					var promise =  $http.post (contextRoot, data, {
						 headers: {
							 'Content-Type': 'application/json; charset=utf-8'
							 }
					});
					return promise;
				 };	
				 
				 viewFactory.otherTimeCall = function(inputtext, context){
					 
					 var oPayload = {
			                    	'inputText' : inputtext , 
			                    	'context' : context
			                  };
					 var data = JSON.stringify(oPayload);
					 var contextRoot = 'http://luxottica-virtual-agent-v2.mybluemix.net/conversation/v1/processConversation';

					 //var promise =  $http.get(contextRoot, {
					//var contextRoot = 'https://localhost:8443/conversation/v1/processConversation';
					 var promise =  $http.post (contextRoot, data, {
						 headers: {
							 'Content-Type': 'application/json; charset=utf-8'
							 }
					});
					return promise;
				 };	

				 viewFactory.uploadImage = function(file, context){
					 
					 var oPayload = {
			                    	'inputText' : '' , 
			                    	'context' : context
			                  };
					 var json = JSON.stringify(oPayload);
					 var url = 'http://luxottica-virtual-agent-v2.mybluemix.net/conversation/v1/processConversation';
		             var data = new FormData();
		             data.append('context',json);
		             data.append('file', file);
					 var promise =  $http.post(url, data, {
		                  transformRequest: angular.identity,
		                  headers: {'Content-Type': undefined}
					 });
		             return promise;
				 };
				
			
				return viewFactory;
			} ]);
})();