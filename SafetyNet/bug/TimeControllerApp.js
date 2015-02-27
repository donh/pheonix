/* 
* @Author: roverzon
* @Date:   2015-02-20 14:42:09
* @Last Modified by:   roverzon
* @Last Modified time: 2015-02-27 21:58:26
*/

var myApp = angular.module('myApp',[]);
myApp.controller('TimeCtrl', ['$scope' , '$timeout', function ($scope , $timeout) {
	
	// initial data 
	$scope.seconds = 0; // model for countdown
	$scope.innerSecs = 0; 
	$scope.max = 20; // maxmum seconds 
	$scope.statusAttr = null; // css property changed by js
	$scope.state=null; // state 
	$scope.percentage=null; // controller of width of bar
	$scope.currentTime=null;
	$scope.motion=null;
	$scope.millis=null;

	var Iprogresser;
	var timeLogger;
	var stopped;
	var timer; // there is another default function called timer in windows therefore a new defination of timer variable is not recommened.
	// stop timer
	var timeLoggerArray = [];
	var innerMax = 6;
	var innerTimer;
	var sec;
	 
	$scope.stopTimer = function(){		
		if ($scope.startTime != null) {
			$timeout.cancel(stopped);
			$scope.stopTime = timeLogger();
			$timeout(function(){
				Itimer();
				$scope.stopTime = null;
			},5000);
		};
	};

	$scope.startTimer = function(){
		$scope.startTime = timeLogger();
		Itimer();
		$scope.motion = '開始';
	};

	$scope.relieveTimer = function(){
		$timeout.cancel(stopped);
		$scope.seconds=0;
		$scope.percentage = 0
		$scope.statusAttr = null;
		$scope.endTime = timeLogger();
	}

	$scope.resetTimer = function(){
		$timeout.cancel(stopped);
		$scope.seconds = 0;
		$scope.percentage = 0;
		$scope.state='';
		$scope.motion='重置'
		Itimer();
		$scope.startTime = timeLogger();
		$scope.endTime = null;

	};

	// start timer 
	Itimer = function(){
		// create a timer function with recursion 
		$scope.millis = new Date() - $scope.startTime ;
		var adjustment = $scope.millis % 1000;
		$scope.seconds = Math.floor(($scope.millis - adjustment)/1000);

		stopped = $timeout(function(){
			// $scope.seconds++;
			console.log($scope.seconds);
			console.log(adjustment);
			if ($scope.seconds < $scope.max) {	
				Itimer();
				// modify bootstrap progress bar css
				Iprogresser($scope.seconds);
				$scope.percentage = ($scope.seconds / $scope.max)*100; 
			}else{
				// if time goes over the maxmum time, it will stop automatically.
					// $scope.stopTimer();
				Itimer();
				Iprogresser($scope.seconds);
				$scope.percentage = ($scope.max / $scope.max)*100;
			};
		// normalize the width of bootstrap progress bar width
		
		// console.log($scope.percentage);
		// timeout seeting is based on millisecond, therefore 1000 millisecond is 1 second.
		},1000);
	};

	Iprogresser = function(secs){
	    if (  0 <= secs  && secs< 5) {
            //blue
            $scope.statusAttr = 'progress-info';
            $scope.state = '職勤';
        }else if (5 <= secs && secs < 10) {
            //green
            $scope.statusAttr = 'progress-success';
            $scope.state = '安全';
        }else if (10 <= secs && secs < 15){
            //yellow
            $scope.statusAttr = 'progress-warning';
            $scope.state = '警告';
        }else if(15 <= secs && secs < $scope.max){
            //red
            $scope.statusAttr = 'progress-danger';
            $scope.state = '危險';
		}else{
			$scope.statusAttr = 'progress-danger';
            $scope.state = '緊急狀況';
		}
	};

	timeLogger = function(motion){
		var currentTime =  new Date();
		timeLoggerArray.push(currentTime);
		return currentTime;
	};

	timeLoggerDumper = function(){
		for (var i = timeLoggerArray.length - 1; i >= 0; i--) {
			timeLoggerArray[i];
		};
	}
}]);