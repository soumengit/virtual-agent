//Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function() {
	'use strict';
	// Work Order Split Options Controller
	angular.module('easysystemsServiceApp').controller(
			"easysystemsServiceAppController", easysystemsServiceAppController);
	
	angular.module('easysystemsServiceApp').directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);

	angular.module('easysystemsServiceApp').directive('compile', ['$compile', function ($compile) {
	    return function(scope, element, attrs) {
	      scope.$watch(
	        function(scope) {
	          return scope.$eval(attrs.compile);
	        },
	        function(value) {
	          element.html(value);
	          $compile(element.contents())(scope);
	        }
	    );
	  };
	}]); 
	
	easysystemsServiceAppController.$inject = [ '$scope', '$rootScope', '$sce', 'easysystemsServiceAppService',
			 '$interval', '$state'];
	function easysystemsServiceAppController($scope, $rootScope, $sce, easysystemsServiceAppService, $interval, $state) {

		$scope.easysystems = {};
		$scope.easysystems.response = [];
		$scope.easysystems.chatTrace = [];
		$scope.easysystems.firstTime = '';
		$scope.easysystems.requestContext = [];
		$scope.easysystems.alreadyScrolledDown = false;
		$scope.easysystems.withSpace = false;
		$scope.easysystems.inputtext = '';
		
		function serviceCall($scope){
			if ($scope.easysystems.inputtext != '') {
			var today=new Date();
		    var h=today.getHours();
		    var m=today.getMinutes();
		    var s=today.getSeconds();
		    if (m<10) {m = "0" + m};  // add zero in front of numbers < 10
		    if (s<10) {s = "0" + s};
		    if (h<12) {
		    	var time = h+":"+m + " am";
		    } else {
		    	h = h -12;
		    	var time = h+":"+m + " pm";
		     }
		    $scope.easysystems.chatTrace.push("User: " + $scope.easysystems.inputtext.replace("_UI", ""));
		    $scope.easysystems.requestContext.chatTrace = $scope.easysystems.chatTrace;
		    var input = {inouttimeput:$scope.easysystems.inputtext.replace("_UI", ""), inputFlag:true, outputFlag:false, timeValue:false};
			easysystemsServiceAppService.otherTimeCall($scope.easysystems.inputtext, $scope.easysystems.requestContext).then(
					function(success) {	
						$scope.easysystems.requestContext = success.data.context;
						//var watsonTxt = success.data.text.toString();
						var watsonTxt = success.data.text;
						$scope.easysystems.response.push(input);
						for(var i = 0; i < watsonTxt.length; i++) {
						    var eachText= watsonTxt[i];
						    eachText=$sce.trustAsHtml(eachText);
						    var output =  {inouttimeput: eachText , inputFlag:false, outputFlag:true, timeValue:time};
						    $scope.easysystems.response.push(output);
						}
						//watsonTxt=$sce.trustAsHtml(watsonTxt);
						//var output =  {inouttimeput: watsonTxt , inputFlag:false, outputFlag:true, timeValue:time};
						
						
						var chatTraceOutput = $scope.easysystems.response[$scope.easysystems.response.length-1].inouttimeput;
					/*	chatTraceOutput = chatTraceOutput.replace(/<\/br>/gi, " ");
						chatTraceOutput = chatTraceOutput.replace(/<\/p>/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/<p>/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/\_UI/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/[^0-9a-zA-Z\,\.\?\:\-\_ ]/gi, '')
						$scope.easysystems.chatTrace.push("Bot: " + chatTraceOutput);*/
						$scope.easysystems.inputtext = '';							
						$scope.easysystems.alreadyScrolledDown = false;
						window.setInterval(function() {
						if (!$scope.easysystems.alreadyScrolledDown) {
							$scope.easysystems.alreadyScrolledDown = true;
							var objDiv = document.getElementById("scrolldiv");
							objDiv.scrollTop = objDiv.scrollHeight;
						}
					}, 5);
						
				}, function(error) {						
						alert('error');
					});			
				}	
			};

		$scope.refreshService = function(){
			serviceCall($scope);
		};	
		
		$scope.refreshServiceforYes = function(){
			$scope.easysystems.inputtext = 'Yes_UI';
			serviceCall($scope);
		};
		
		$scope.refreshServiceforNo = function(){
			$scope.easysystems.inputtext = 'No_UI';
			serviceCall($scope);
		};

		$scope.uploadImage = function(){
			var today=new Date();
		    var h=today.getHours();
		    var m=today.getMinutes();
		    var s=today.getSeconds();
		    if (m<10) {m = "0" + m};  // add zero in front of numbers < 10
		    if (s<10) {s = "0" + s};
		    if (h<12) {
		    	var time = h+":"+m + " am";
		    } else {
		    	h = h -12;
		    	var time = h+":"+m + " pm";
		    }
			var file = $scope.easysystems.uploadimage;
			var input = {inouttimeput:"User uploaded a VIN image.", inputFlag:true, outputFlag:false, timeValue:false};
			easysystemsServiceAppService.uploadImage(file, $scope.easysystems.requestContext).then(
					function(success) {	
						$scope.easysystems.requestContext = success.data.context;
						console.log(success.data.text.toString());
						var output = {inouttimeput: success.data.text.toString().split('</br>').join(' ') , inputFlag:false, outputFlag:true, yesNoFlag :false,  timeValue:time};
						$scope.easysystems.response.push(input);
						$scope.easysystems.response.push(output);
						$scope.easysystems.chatTrace.push("Bot: " + $scope.easysystems.response[$scope.easysystems.response.length-1].inouttimeput);
						$scope.easysystems.inputtext = '';							
						$scope.easysystems.alreadyScrolledDown = false;
						window.setInterval(function() {
							if (!$scope.easysystems.alreadyScrolledDown) {
								$scope.easysystems.alreadyScrolledDown = true;
								var objDiv = document.getElementById("scrolldiv");
								objDiv.scrollTop = objDiv.scrollHeight;
							}
						}, 5);						
					}, 
					function(error) {						
						alert('error'+error);
						console.log(error);
					}
			);	
		};		
		window.onresize = function() {
			var objDiv = document.getElementById("scrolldiv");
			var screenHeight = window.innerHeight - 220;
			objDiv.style.height = screenHeight  + 'px';
			$scope.easysystems.alreadyScrolledDown = false;
			window.setInterval(function() {
			if (!$scope.easysystems.alreadyScrolledDown) {
				$scope.easysystems.alreadyScrolledDown = true;
				var objDiv = document.getElementById("scrolldiv");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		}, 5);
		};
		
		$scope.firstService = function(){
			easysystemsServiceAppService.firstTimeCall().then(
					function(success) {	
						var objDiv = document.getElementById("scrolldiv");
						var screenHeight = window.innerHeight - 220;
						objDiv.style.height = screenHeight  + 'px';
						$scope.easysystems.requestContext = success.data.context;
						document.getElementById("textIn").disabled = false;
						var today=new Date();
					    var h=today.getHours();
					    var m=today.getMinutes();
					    var s=today.getSeconds();
					    if (m<10) {m = "0" + m};  // add zero in front of numbers < 10
					    if (s<10) {s = "0" + s};
					    if (h<12) {
					    	$scope.easysystems.firstTime = h+":"+m + " am";
					    } else {
					    	h = h -12;
					    	$scope.easysystems.firstTime = h+":"+m + " pm";
					     }
					    var watsonTxt = success.data.text.toString();
                        						watsonTxt=$sce.trustAsHtml(watsonTxt);
					    var output = {inouttimeput: watsonTxt, inputFlag:false, outputFlag:true, timeValue:$scope.easysystems.firstTime};

						$scope.easysystems.response.push(output);
						$scope.easysystems.chatTrace.push("Bot: " + success.data.output.text.toString().replace("</br>", ""));
						}, function(error) {						
						alert('error');
					});	
		};
		
	};
})();