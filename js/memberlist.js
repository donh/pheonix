var MemberApp = angular.module('MemberApp', ['timer','ui.bootstrap',]);
MemberApp.controller('MemberCtrl', function($scope) {
	$scope.members = [
		{ code : 16 ,'name' : '程昌興','grade': '3.1','position': '指揮官'  },
		{ code : 17 ,'name' : '黃炳松','grade': '2.4','position': '副指揮官'},
		{ code : 18 ,'name' : '蔡三榮','grade': '2.3','position': '安全官'  },
		{ code : 18 ,'name' : '陳文暘','grade': '2.3','position': '安全官'  },
		{ code : 163,'name' : '林鉦凱','grade': '1.3','position': '連絡官'  },
		{ code : 163,'name' : '王穎齊','grade': '1.3','position': '連絡官'  },
		{ code : 163,'name' : '吳泊諭','grade': '1.3','position': '連絡官'  },
		{ code : 163,'name' : '邱仕謀','grade': '1.3','position': '連絡官'  },
		{ code : 164,'name' : '許智緯','grade': '1.4','position': '小隊長'  },
		{ code : 164,'name' : '吳偉嘉','grade': '1.4','position': '小隊長'  },
		{ code : 164,'name' : '劉培昱','grade': '1.3','position': '水源官'  },
		{ code : 164,'name' : '吳佳贏','grade': '1.3','position': '水源官'  },
		{ code : 164,'name' : '林挺生','grade': '1.3','position': '水源官'  },
		{ code : 165,'name' : '洪秀昇','grade': '1.3','position': '後勤官'  },
		{ code : 165,'name' : '李晨維','grade': '1.3','position': '後勤官'  },
		{ code : 165,'name' : '陳成圳','grade': '1.3','position': '後勤官'  },
		{ code : 165,'name' : '蘇淑娟','grade': '1.3','position': '後勤官'  },
	];

	$scope.staffs = [
		{ id : 0, 'name' : '程昌興' , position : '指揮官', time: null }
	];

	$scope.assignStaff = function(member) {
		// var now = moment().utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
		// console.log('now =', now);
		// console.log('member =', member);
		// console.log('$scope.staffs =', $scope.staffs);
		var names = [];
		for (var i in $scope.staffs) {
			names.push($scope.staffs[i].name);
		}
		if (names.indexOf(member.name) === -1) {
			var idNew = names.length++;
			member.id = idNew;
			member.time = null;
			$scope.staffs.push(member);
		}
	};

	$scope.setTime = function(staff) {
		var now = moment().utcOffset(8).format('YYYY/MM/DD HH:mm:ss');
		console.log('now =', now);
		// console.log('member =', member);
		// console.log('$scope.staffs =', $scope.staffs);
		var names = [];
		for (var i in $scope.staffs) {
			names.push($scope.staffs[i].name);
		}

		var key = names.indexOf(staff.name);
		$scope.staffs[key].time = now;
	};
});

MemberApp.controller('CountDownTimerCtrl', function ($scope) {
	 $scope.timerRunning = true;

    $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
        console.log("start timer");
    };

    $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
    };

});
