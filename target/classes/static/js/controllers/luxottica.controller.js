//Wrap Angular components in an Immediately Invoked Function Expression (IIFE)
(function() {
	'use strict';
	// Work Order Split Options Controller
	angular.module('luxotticaServiceApp').controller(
			"luxotticaServiceAppController", luxotticaServiceAppController);
	
	angular.module('luxotticaServiceApp').directive('fileModel', ['$parse', function ($parse) {
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

	angular.module('luxotticaServiceApp').directive('compile', ['$compile', function ($compile) {
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
	
	luxotticaServiceAppController.$inject = [ '$scope', '$rootScope', '$sce', 'luxotticaServiceAppService',
			 '$interval', '$state'];
	function luxotticaServiceAppController($scope, $rootScope, $sce, luxotticaServiceAppService, $interval, $state) {

		$scope.luxottica = {};
		$scope.luxottica.response = [];
		$scope.luxottica.chatTrace = [];
		$scope.luxottica.firstTime = '';
		$scope.luxottica.requestContext = [];
		$scope.luxottica.alreadyScrolledDown = false;
		$scope.luxottica.withSpace = false;
		$scope.luxottica.inputtext = '';
		
		function serviceCall($scope){
			if ($scope.luxottica.inputtext != '') {
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
		    $scope.luxottica.chatTrace.push("User: " + $scope.luxottica.inputtext.replace("_UI", ""));
		    $scope.luxottica.requestContext.chatTrace = $scope.luxottica.chatTrace;
		    var input = {inouttimeput:$scope.luxottica.inputtext.replace("_UI", ""), inputFlag:true, outputFlag:false, timeValue:false};
			luxotticaServiceAppService.otherTimeCall($scope.luxottica.inputtext, $scope.luxottica.requestContext).then(
					function(success) {	
						$scope.luxottica.requestContext = success.data.context;
						//var watsonTxt = success.data.text.toString();
						var watsonTxt = success.data.text;
						$scope.luxottica.response.push(input);
						for(var i = 0; i < watsonTxt.length; i++) {
						    var eachText= watsonTxt[i];
						    eachText=$sce.trustAsHtml(eachText);
						    var output =  {inouttimeput: eachText , inputFlag:false, outputFlag:true, timeValue:time};
						    $scope.luxottica.response.push(output);
						}
						//watsonTxt=$sce.trustAsHtml(watsonTxt);
						//var output =  {inouttimeput: watsonTxt , inputFlag:false, outputFlag:true, timeValue:time};
						
						
						var chatTraceOutput = $scope.luxottica.response[$scope.luxottica.response.length-1].inouttimeput;
					/*	chatTraceOutput = chatTraceOutput.replace(/<\/br>/gi, " ");
						chatTraceOutput = chatTraceOutput.replace(/<\/p>/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/<p>/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/\_UI/gi, "");
						chatTraceOutput = chatTraceOutput.replace(/[^0-9a-zA-Z\,\.\?\:\-\_ ]/gi, '')
						$scope.easysystems.chatTrace.push("Bot: " + chatTraceOutput);*/
						$scope.luxottica.inputtext = '';							
						$scope.luxottica.alreadyScrolledDown = false;
						window.setInterval(function() {
						if (!$scope.luxottica.alreadyScrolledDown) {
							$scope.luxottica.alreadyScrolledDown = true;
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
			$scope.luxottica.inputtext = 'Yes_UI';
			serviceCall($scope);
		};
		
		$scope.refreshServiceforNo = function(){
			$scope.luxottica.inputtext = 'No_UI';
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
			var file = $scope.luxottica.uploadimage;
			var input = {inouttimeput:"User uploaded a VIN image.", inputFlag:true, outputFlag:false, timeValue:false};
			luxotticaServiceAppService.uploadImage(file, $scope.luxottica.requestContext).then(
					function(success) {	
						$scope.luxottica.requestContext = success.data.context;
						console.log(success.data.text.toString());
						var output = {inouttimeput: success.data.text.toString().split('</br>').join(' ') , inputFlag:false, outputFlag:true, yesNoFlag :false,  timeValue:time};
						$scope.luxottica.response.push(input);
						$scope.luxottica.response.push(output);
						$scope.luxottica.chatTrace.push("Bot: " + $scope.luxottica.response[$scope.luxottica.response.length-1].inouttimeput);
						$scope.luxottica.inputtext = '';							
						$scope.luxottica.alreadyScrolledDown = false;
						window.setInterval(function() {
							if (!$scope.luxottica.alreadyScrolledDown) {
								$scope.luxottica.alreadyScrolledDown = true;
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
			$scope.luxottica.alreadyScrolledDown = false;
			window.setInterval(function() {
			if (!$scope.luxottica.alreadyScrolledDown) {
				$scope.luxottica.alreadyScrolledDown = true;
				var objDiv = document.getElementById("scrolldiv");
				objDiv.scrollTop = objDiv.scrollHeight;
			}
		}, 5);
		};
		
		$scope.firstService = function(){
			luxotticaServiceAppService.firstTimeCall().then(
					function(success) {	
						var objDiv = document.getElementById("scrolldiv");
						var screenHeight = window.innerHeight - 220;
						objDiv.style.height = screenHeight  + 'px';
						$scope.luxottica.requestContext = success.data.context;
						document.getElementById("textIn").disabled = false;
						var today=new Date();
					    var h=today.getHours();
					    var m=today.getMinutes();
					    var s=today.getSeconds();
					    if (m<10) {m = "0" + m};  // add zero in front of numbers < 10
					    if (s<10) {s = "0" + s};
					    if (h<12) {
					    	$scope.luxottica.firstTime = h+":"+m + " am";
					    } else {
					    	h = h -12;
					    	$scope.luxottica.firstTime = h+":"+m + " pm";
					     }
					    var watsonTxt = success.data.text.toString();
                        						watsonTxt=$sce.trustAsHtml(watsonTxt);
					    var output = {inouttimeput: watsonTxt, inputFlag:false, outputFlag:true, timeValue:$scope.luxottica.firstTime};

						$scope.luxottica.response.push(output);
						$scope.luxottica.chatTrace.push("Bot: " + success.data.output.text.toString().replace("</br>", ""));
						}, function(error) {						
						alert('error');
					});	
		};
		
	};
})();