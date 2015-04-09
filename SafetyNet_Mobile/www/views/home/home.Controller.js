angular.module('home',['safetyNet.services','timer','ui.bootstrap'])


.controller('HomeController', ['$scope','$localstorage', '$timeout', '$ionicPopup', function ($scope , $localstorage , $timeout, $ionicPopup ) {

		// localStorage.clear();

		$scope.taskForceList = [];

		$scope.showTaskForce = function(){
			$scope.taskForceList = $localstorage.getObject('taskForce_mem')
       		$scope.$broadcast('scroll.refreshComplete');

		}
	
}])


.controller('TimerCtrl', ['$scope', function ($scope) {

    $scope.timerRunning = false;

    $scope.timerSwitch = function(){
    	$scope.timerRunning = !$scope.timerRunning;

    	if ($scope.timerRunning) {
    		$scope.$broadcast('timer-start');
    		console.log('start timer');

    	}else{
    		$scope.$broadcast('timer-stop');
    		console.log("stop timer")

    	}
    };

  
}])
