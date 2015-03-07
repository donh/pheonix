/* 
* @Author: roverzon
* @Date:   2015-02-27 09:04:31
* @Last Modified by:   roverzon
* @Last Modified time: 2015-02-27 12:41:23
*/

angular.module('MyApp', ['timer','ui.bootstrap']);
function MyAppController($scope) {
    $scope.timerRunning = true;

    $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
        console.log('start timer');
    };

    $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };
}