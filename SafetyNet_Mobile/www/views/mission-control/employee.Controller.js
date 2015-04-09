angular.module('employee',['safetyNet.services'])

.controller('employeeController', ['$scope','$localstorage', 'employeeFactory', function ($scope, $localstorage ,employeeFactory) {

	$scope.onDutyList  = employeeFactory.getNameList();
	$scope.checkedList = null;
	$scope.mission = "火災搶救";

	var taskForceList = [];
	var taskId = 0;

	$localstorage.setObject('taskForce_mem',taskForceList);

	$scope.postCheck = function(){
		// console.log(JSON.stringify($scope.onDutyList))
		$scope.checkedList = employeeFactory.getCheckedList();

	};

	$scope.moveItem = function(item, fromIndex, toIndex) {
		    //Move the item in the array
	    $scope.checkedList.splice(fromIndex, 1);
	    $scope.checkedList.splice(toIndex, 0, item);
	};

	$scope.Options = function(value){
		console.log(value)
	};

	$scope.saveTaskForce = function(){
		// localStorage.clear();
		taskId += 1; 
		if ($scope.checkedList.length > 1 ) {
			taskForce  = employeeFactory.createTaskForce($scope.checkedList , taskId , $scope.mission);
			taskForceListData = $localstorage.getObject('taskForce_mem');
			taskForceListData.push(taskForce);
			$localstorage.setObject('taskForce_mem',taskForceListData);

			// console.log(JSON.stringify(taskForceList[0]));
			console.log(taskForceList.length);
		}

		$scope.checkedList = [];
	}
}])




