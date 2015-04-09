/**
* employeeFactory Module
*
* Description
*/
angular.module('employee.utils', ['safetyNet.services'])

.factory('employeeFactory', [function () {


	var taskForceList = [],
		taskForceId = 0,
		checkedList = [],
		employees = [

		{
			"id" : 1,
			"firstName"   : "昌興",
			"lastName"    : "程",
			"reports"     : 0, 
			"managerId"   : 0,
			"managerName" : "",
			"title"       : "大隊長",
			"department"  : "第一大隊",
			"cellPhone"   : "0910307222",
			"officePhone" : "",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['指揮官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 2,
			"firstName"   : "炳松",
			"lastName"    : "黃",
			"reports"     : 0, 
			"managerId"   : 0,
			"managerName" : "",
			"title"       : "副大隊長",
			"department"  : "第一大隊",
			"cellPhone"   : "0928963622",
			"officePhone" : "",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['指揮官','副指揮官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 3,
			"firstName" : "三榮",
			"lastName"  : "蔡",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "組長",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['安全官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 4,
			"firstName" : "文暘",
			"lastName"  : "陳",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "組長",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['安全官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 5,
			"firstName" : "智緯",
			"lastName"  : "許",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "小隊長",
			"department": "第一大隊",
			"cellPhone" : "",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['小隊長','作戰官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 6,
			"firstName"   : "偉嘉",
			"lastName"    : "吳",
			"reports"     : 0, 
			"managerId"   : 0,
			"managerName" : "",
			"title"       : "小隊長",
			"department"  : "第一大隊",
			"cellPhone"   :"",
			"officePhone" :"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['小隊長','作戰官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 7,
			"firstName" : "鉦凱",
			"lastName"  : "林",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['聯絡官','水源官','後勤官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 8,
			"firstName" : "泊諭",
			"lastName"  : "吳",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['聯絡官','水源官','後勤官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 9,
			"firstName" : "穎齊",
			"lastName"  : "王",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['聯絡官','水源官','後勤官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 10,
			"firstName" : "釋謀",
			"lastName"  : "邱",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['聯絡官','水源官','後勤官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 11,
			"firstName" : "裴昱",
			"lastName"  : "劉",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['水源官','後勤官','聯絡官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 12,
			"firstName" : "佳贏",
			"lastName"  : "吳",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['水源官','後勤官','聯絡官'],
			"mission" : null,
			"taskForceId" : null,

		},
		{
			"id" : 13,
			"firstName" : "挺生",
			"lastName"  : "林",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['水源官','後勤官','聯絡官','司機'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 14,
			"firstName" : "晨維",
			"lastName"  : "李",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['後勤官','聯絡官','水源官','司機'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 15,
			"firstName" : "成圳",
			"lastName"  : "陳",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['後勤官','聯絡官','水源官','司機'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 16,
			"firstName" : "淑娟",
			"lastName"  : "蘇",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['後勤官','聯絡官','水源官'],
			"mission" : null,
			"taskForceId" : null,
		},
		{
			"id" : 17,
			"firstName" : "秀昇",
			"lastName"  : "洪",
			"reports"   : 0, 
			"managerId" : 0,
			"managerName" : "",
			"title"     : "隊員",
			"department": "第一大隊",
			"cellPhone" :"",
			"officePhone":"",
			"email":"",
			"city":"",
			"onDuty": true,
			"checked": false,
			"isLeader":false,
			"missionOptions" :['後勤官','聯絡官','水源官','司機'],
			"mission" : null,
			"taskForceId" : null,
		}];
	
	return {

		getNameList : function(){
			return employees;
		},

		getCheckedList : function(id){
			var onDutyListTmp = [];
			for (var i = 0 ; i <  employees.length ; i++ ) {

				if (employees[i].checked) {
					onDutyListTmp.push(employees[i]);				
				};
			};
			checkedList = onDutyListTmp;
			onDutyListTmp = [];

			return checkedList
		},

		createTaskForce : function( taskFoceData , id , mission){
			var taskForce = null,
				leaderId = null,
				memberNumber = taskFoceData.length -1,
				members =[],
				missionTypeAttr;
			
			leaderId = taskFoceData[0].id;			
			for (var i = 0; i < taskFoceData.length ; i++) {

				if ( i === 0) {
					employees[taskFoceData[i].id-1].managerId = 0;
					// console.log(memberNumber)
					employees[taskFoceData[i].id-1].reports = memberNumber;
				}else{
					employees[taskFoceData[i].id-1].managerId  = leaderId;
				}

				members.push(employees[taskFoceData[i].id-1]);		
				employees[taskFoceData[i].id-1].checked = false;
				employees[taskFoceData[i].id-1].taskForceId = id;		
			};


			if (mission == null) {
				mission = "火災搶救";
				missionTypeAttr = "item-assertive";
			}else if(mission === "火災搶救"){
				missionTypeAttr = "item-assertive";
			}else if(mission === "緊急醫療"){
				missionTypeAttr = "item-positive";
			}else if(mission === "急難救援"){
				missionTypeAttr = "item-energized";
			}else{
				missionTypeAttr = "item-balanced";
			};


			taskForce = {
				"id" : id,
				"status": "active",
				"missionType": mission,
				"missionTypeAttr" : missionTypeAttr,
				"leaderId" : leaderId,
				"memberNumber": memberNumber,
				"members" : members,
			};

			return taskForce;
				
		}
	};
}])

