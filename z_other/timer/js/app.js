'use strict';
// var wdApp = angular.module('wdApp', ['ngRoute', 'wu.masonry']);
// var wdApp = angular.module('wdApp', ['ngRoute']);
// var wdApp = angular.module('wdApp', ['ngSanitize']);
var wdApp = angular.module('wdApp', ['ngRoute', 'ngSanitize']);


/**
 * @config:			wdApp.config(['$routeProvider', '$locationProvider'])
 * @description:	This config sets routing.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/30/2014
 * @last modified: 	01/29/2015
 * @called by:		URL
 */
// http://viralpatel.net/blogs/angularjs-routing-and-views-tutorial-with-example/
// https://docs.angularjs.org/api/ngRoute/service/$route#example
wdApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			// templateUrl: '/templates/home.html',
			controller: 'HomeController',
		})
		.when('/edit', {
			templateUrl: '/templates/edit.html',
			controller: 'EditController',
		})
		.when('/signup', {
			templateUrl: '/templates/signup.html',
			controller: 'SignupController',
		})
		.when('/favorites/:username', {
			// templateUrl: '/templates/favorites.html',
			templateUrl: '/templates/home.html',
			controller: 'FavoritesController',
		})
///*
		.when('/collection/:collectionKey', {
			templateUrl: '/templates/collection.html',
			controller: 'CollectionController',
		})
//*/
		.when('/dress/:dressId', {
			templateUrl: '/templates/dress.html',
			controller: 'DressController',
		})
///*
		.when('/designer/:designerKey', {
			templateUrl: '/templates/designer.html',
			controller: 'DesignerController',
			// resolve: {
			// 	// I will cause a 1 second delay
			// 	// delay: function($q, $timeout) {
			// 	// 	var delay = $q.defer();
			// 	// 	$timeout(delay.resolve, 1000);
			// 	// 	return delay.promise;
			// 	// }
			// }
		})
		.when('/accents/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/color/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/fabric/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/neckline/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/silhouette/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/sleeves/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/train/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/season/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/style/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
		.when('/venue/:tag', {
			templateUrl: '/templates/home.html',
			controller: 'TagController',
		})
//*/
		.otherwise({
			redirectTo: '/'
			//redirectTo: '/index.html'
			//redirectTo: '/designer'
		});
		$locationProvider.html5Mode(true);
		
		// .when('/ShowOrder/:orderId', {
		// 	templateUrl: 'templates/show_order.html',
		// 	controller: 'ShowOrderController'
		// })
		// .when('/addOrder', {
		// 	templateUrl: 'templates/add-order.html',
		// 	controller: 'AddOrderController'
		// })
		// .when('/showOrders', {
		// 	templateUrl: 'templates/show-orders.html',
		// 	controller: 'ShowOrdersController'
		// })
		// .otherwise({
		// 	redirectTo: '/addOrder'
		// });
		// .when('/map', {
		// 	template: "partials/map.html ",
		// 	controller: 'mapController',
		// 	reloadOnSearch: false,
		// 	animation: 'slide'
		// })
		// .otherwise({redirectTo: '/map'});
	}
]);



/**
 * @controller:		GuideController
 * @description:	This function sets data for style guide page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/29/2015
 * @last modified: 	01/30/2015
 * @called by:		$routeProvider.when('/beginners-guide-to-wedding-dresses')
 */
wdApp.controller('GuideController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	$scope.currentUser = false;
	$scope.messages = false;
	$scope.downloadBoxShow = false;

	// console.log('$location.$$path =', $location.$$path);	// use $location.$$path
	var page = -1;
	var path = $location.$$path;	// '/beginners-guide-to-wedding-dresses'
	// var path = window.location.pathname;	// same as above
	console.log('path =', path);
	if (path === '/beginners-guide-to-wedding-dresses') page = 1;
	else page = parseInt($routeParams.page);
	console.log('page =', page);
	$scope.subscriber = {
		firstName: '',
		lastName: '',
		email: '',
		page: page,
		source: '',
	};

	var pagePrev = false;
	var pageNext = false;
	var top = 85;

	if (page > 1) {
		$scope.styleguideTopMenuShow = true;
		pagePrev = page - 1;
		if (page < 7) pageNext = page + 1;
		if (page === 4) top = 89;
		if (page === 5) top = 94;
		if (page === 7) top = 81;
	} else $scope.styleguideTopMenuShow = false;
	// console.log('page =', page);
	// $scope.page = page;
	// console.log('$scope.page =', $scope.page);
	$scope.pageNum = page;
	console.log('$scope.pageNum =', $scope.pageNum);
	$scope.pagePrev = pagePrev;
	$scope.pageNext = pageNext;
	$scope.top = top;



	var visibleWidth = document.body.clientWidth;
	var visibleHeight = document.body.clientHeight;
	var shareBoxRightMargin = (visibleWidth / 2) - 592;
	if (shareBoxRightMargin < 0) shareBoxRightMargin = 0;
	shareBoxRightMargin = shareBoxRightMargin + 'px';
	// document.getElementById('shareBox').style.right = shareBoxRightMargin;
	$scope.shareBoxStyle = {
		right: shareBoxRightMargin
	};

	var downloadSubscribeBoxLeftMargin = ((visibleWidth - 490) / 2) - 5;
	var downloadSubscribeBoxTopMargin = ((visibleHeight - 240) / 2) - 5;
	downloadSubscribeBoxLeftMargin = downloadSubscribeBoxLeftMargin + 'px';
	downloadSubscribeBoxTopMargin = downloadSubscribeBoxTopMargin + 'px';
	// $scope.downloadSubscribeBoxLeftMargin = downloadSubscribeBoxLeftMargin + 'px';
	// $scope.downloadSubscribeBoxTopMargin = downloadSubscribeBoxTopMargin + 'px';
	$scope.downloadBoxStyle = {
		top: downloadSubscribeBoxTopMargin,
		left: downloadSubscribeBoxLeftMargin
	};

		
	/**
	 * @function name:	$scope.lightBoxPopUp = function ()
	 * @description:	This function pops up a light box and sets background transparent (opacity = .20).
	 * @related issues:	WD-112
	 * @related issues:	WD-094
	 * @param:			void
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			10/28/2014
	 * @last modified: 	01/30/2015
	 * @called by:		<div id="shareBoxDownload" ng-click="lightBoxPopUp();" class="clickable">Download</div>
	 *					 in php/public/templates/guide.html
	 */
	$scope.lightBoxPopUp = function () {
		// console.log('lightBoxPopUp');
		$scope.downloadBoxShow = true;
		$scope.styleguideMainStyle = {
			opacity: 0.2
		};
	};


	/**
	 * @function name:	$scope.lightBoxHide = function ()
	 * @description:	This function hides a light box and sets background not transparent (opacity = 1).
	 * @related issues:	WD-112
	 * @related issues:	WD-094
	 * @param:			void
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			10/28/2014
	 * @last modified: 	01/30/2015
	 * @called by:		<button id="cboxClose" ng-click="lightBoxHide();"></button>
	 *					 in php/public/templates/guide.html
	 */
	$scope.lightBoxHide = function () {
		$scope.downloadBoxShow = false;
		$scope.styleguideMainStyle = {
			opacity: 1
		};
	};


	$scope.guideSubmit = function (subscriber) {
		// user.token = token;
		// subscriber.page = page;
		console.log('subscriber =', subscriber);
/*
		$http.post('/api/reset', user)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				// console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
				var messages = obj.messages;
				// console.log('messages =', messages);
				$rootScope.messages = messages;
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
*/
	};

	$document.ready(function () {
		// $('#resetForm').parsley();
		$('#learnMoreForm').parsley();
		$('#downloadForm').parsley();

/*
		$('#downloadBoxSubmit').click(function(e) { 
			var valid = $('#downloadForm').parsley().isValid();
			if ( valid === false ) {
				e.preventDefault();
			} else {
				document.getElementById('downloadBox').style.display='none';
				$.post('/beginners-guide-to-wedding-dresses', $('#downloadForm').serialize());
				document.getElementById('thankBox').style.display='block';
			}
		});

*/
	});
});




/**
 * @controller:		ResetController
 * @description:	This function sets data for reset page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/16/2015
 * @last modified: 	01/21/2015
 * @called by:		$routeProvider.when('/reset')
 */
wdApp.controller('ResetController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	$scope.currentUser = false;
	$scope.messages = false;
	$scope.user = {
		password: '',
		password_confirmation: '',
		token: '',
	};
	var token = $routeParams.token;
	$scope.reset = function (user) {
		// console.log('user =', user);
		// console.log('token =', token);
		user.token = token;
		// console.log('user =', user);
		$http.post('/api/reset', user)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				// console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
				var messages = obj.messages;
				// console.log('messages =', messages);
				$rootScope.messages = messages;
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
	};
	$document.ready(function () {
		$('#resetForm').parsley();
	});
});


/**
 * @controller:		ForgotController
 * @description:	This function sets data for forgot page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/15/2015
 * @last modified: 	01/21/2015
 * @called by:		$routeProvider.when('/forgot')
 */
wdApp.controller('ForgotController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	$scope.user = {
		email: '',
	};
	$scope.forgot = function (user) {
		// console.log('user =', user);
		$http.post('/api/forgot', user)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
				var messages = obj.messages;
				// console.log('messages =', messages);
				$rootScope.messages = messages;
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
	};
	$document.ready(function () {
		$('#forgotForm').parsley();
	});
});


/**
 * @controller:		FavoritesController
 * @description:	This function sets data for collection page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/29/2014
 * @last modified: 	12/31/2014
 * @called by:		$routeProvider.when('/favorites/:username')
 */
wdApp.controller('FavoritesController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	var username = $routeParams.username;
	// $rootScope.home = false;
	// $rootScope.homeStyle = 'none';
	// $rootScope.homeStyle = {display:none};

	// $rootScope.home = false;
	// var collectionKey = 'berta';
	// console.log('collectionKey =', collectionKey);
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	// console.log('$route =', $route);
	// console.log('$scope.dresses =', $scope.dresses);
	// $scope.pop = false;
	$document.ready(function () {
		// console.log('Hello World');
		// var path = $location.$$path;
		
		// console.log('path =', path);
		// if (path === '/') $rootScope.home = true;
		// else  $rootScope.home = false;
		var url = '/api/favorites/' + username;
		
		wdDressesInit();
		wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 99999);
	});
});



/**
 * @directive:		wdApp.directive('datepicker')
 * @description:	This function sets value of datepicker.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/23/2015
 * @last modified: 	01/23/2015
 * @called by:		$routeProvider.when('/signup')
 */
wdApp.directive('datepicker', function() {
	return {
		require: 'ngModel',
		link: function(scope, el, attr, ngModel) {
			$(el).datepicker({
				onSelect: function(dateText) {
					// console.log('dateText =', dateText);
					var arr = dateText.split('/');
					dateText = arr[2] + '-' + arr[0] + '-' + arr[1];
					scope.$apply(function() {
						ngModel.$setViewValue(dateText);
					});
				}
			});
		}
	};
});


// wdApp.directive('datepicker', function() {
// 	console.log('Hello datepicker');
//   return {
//     link: function(scope, el, attr) {
//       $(el).datepicker({
//         onSelect: function(dateText) {
//           console.log(dateText);
//           var expression = attr.ngModel + " = " + "'" + dateText + "'";
//           scope.$apply(expression);
//           console.log(scope.startDate);
//           // how do i set this elements model property ?
//         }
//       });
//     }
//   };
// });


/**
 * @controller:		SignupController
 * @description:	This function sets data for signup page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/12/2015
 * @last modified: 	01/23/2015
 * @called by:		$routeProvider.when('/signup')
 */
wdApp.controller('SignupController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	$scope.user = {
		firstName: '',
		lastName: '',
		username: '',
		password: '',
		password_confirmation: '',
		email: '',
		weddingDate: '',
		noweddingdate: '',
	};

	$scope.parent = {weddingdate:''};
	
	$scope.signup = function (user) {
		console.log('user =', user);
		if (user.noweddingdate) user.weddingDate = '';
		console.log('user.weddingDate =', user.weddingDate);
		$http.post('/api/signup', user)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				// console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
					var messages = obj.messages;
				// console.log('messages =', messages);
				$rootScope.messages = messages;
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
	};
	$document.ready(function () {
		$('#signupForm').parsley();
		$('#weddingdate').datepicker({dateFormat: 'yy-mm-dd'});
	});
});


/**
 * @controller:		EditController
 * @description:	This function sets data for edit page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/31/2014
 * @last modified: 	01/26/2015
 * @called by:		$routeProvider.when('/favorites/:username')
 */
wdApp.controller('EditController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	// console.log('GET user =', user);
	// $scope.user = {
	// 	firstName: '',
	// 	lastName: '',
	// 	// month: '',
	// 	// day: '',
	// 	// year: '',
	// 	weddingDate: '',
	// 	noweddingdate: '',
	// 	email: '',
	// 	email_new: '',
	// 	email_confirmation: '',
	// 	password_new: '',
	// 	password_confirmation: '',
	// 	password: ''
	// };
	$scope.edit = function (user) {
		console.log('POST user =', user);
		if (user) {
			console.log('user.noweddingdate =', user.noweddingdate);
			if (user.noweddingdate) user.weddingDate = '';
			console.log('user.weddingDate =', user.weddingDate);
			// var editForm = $('#editForm').parsley();
			// console.log('editForm =', editForm);
			// console.log('typeof(editForm) =', typeof(editForm));
			// console.log('Object.keys(editForm) =', Object.keys(editForm));
			// console.log('editForm.validationResult =', editForm.validationResult);
			// console.log('editForm.validate =', editForm.validate);
			// console.log('editForm.isValid =', editForm.isValid);
			
			$http.post('/api/edit', user)
				.success(function(data, status, headers, config) {
					// console.log('POST return');
					// console.log('data =', data);
					var obj = {};
					if (typeof(data) === 'string') {
						obj = JSON.parse(data);
						// console.log('obj =', obj);
					} else if (typeof(data) === 'object') obj = data;
					if (typeof(obj) === 'string') {
						// console.log('still string, JSON.parse second times');
						obj = JSON.parse(obj);
					} else obj = obj;
					console.log('obj =', obj);
					var messages = obj.messages;
					// console.log('messages =', messages);
					$rootScope.messages = messages;
				})
				.error(function(data, status, headers, config) {
					$scope.status = status;
				});
		} else {
			var messages = {};
			messages.error = 'Please enter valid values.';
			$rootScope.messages = messages;
		}
	};
	$document.ready(function () {
		$('#editForm').parsley();
		$('#weddingdate').datepicker({dateFormat: 'yy-mm-dd'});
	});

	$http.get('/api/edit')
		.success(function(data, status, headers, config) {
			// console.log('data =', data);
			// console.log('typeof(data) =', typeof(data));
			var obj = {};
			if (typeof(data) === 'string') {
				obj = JSON.parse(data);
				// console.log('obj =', obj);
			} else if (typeof(data) === 'object') obj = data;
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj.status =', obj.status);
			if (obj.status === 'FOUND') {
				var user = obj.user;
				// console.log('user =', user);

				if (user.weddingDate && user.weddingDate.indexOf('-') > -1) {
					var arr = user.weddingDate.split('-');
					// 2015-02-07
					// 02/07/2015
					if (arr.length === 3) {
						if (arr[0].length === 4) user.year = arr[0];
						if (arr[1].length === 2) user.month = arr[1];
						if (arr[2].length === 2) user.day = arr[2];
						if (arr[0].length === 4 && arr[1].length === 2 && arr[2].length === 2) {
							user.weddingDate = arr[1] + '/' + arr[2] + '/' + arr[0];
						} else user.weddingDate = null;
					} else user.weddingDate = null;
				} else user.weddingDate = null;
				$scope.user = user;
				/*
				var year = false;
				var month = false;
				var day = false;
				if (user.weddingDate && user.weddingDate.indexOf('-') > -1) {
					var arr = user.weddingDate.split('-');
					if (arr.length === 3) {
						if (arr[0].length === 4) year = arr[0];
						if (arr[1].length === 2) month = arr[1];
						if (arr[2].length === 2) day = arr[2];

					} else {}
				} else {}
				$scope.email = user.email;
				$scope.firstName = user.firstName;
				$scope.lastName = user.lastName;
				$scope.year = year;
				$scope.month = month;
				$scope.day = day;
				*/
				$rootScope.currentUser = user;
				$scope.$route = $route;
				$scope.$location = $location;
				$scope.$routeParams = $routeParams;
				// $scope.pop = false;
			}
		})
		.error(function(data, status, headers, config) {
			$scope.status = status;
		});

		
	}
);


/**
 * @controller:		CollectionController
 * @description:	This function sets data for collection page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/29/2014
 * @last modified: 	12/29/2014
 * @called by:		$routeProvider.when('/collection/:collectionKey')
 */
wdApp.controller('CollectionController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	var collectionKey = $routeParams.collectionKey;
	// var collectionKey = 'berta';
	// console.log('collectionKey =', collectionKey);

	$http.get('/api/collection/' + collectionKey)
		.success(function(data, status, headers, config) {
			var obj = JSON.parse(data);
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj.status =', obj.status);
			if (obj.status === 'FOUND') {
				data = obj.data;
				var collection = data.collection;
				var designer = data.designer;
				// console.log('collection =', collection);
				// console.log('designer =', designer);
				$scope.collectionName = collection.collectionName;
				$scope.designerName = designer.designerName;
				$scope.designerUrl = designer.designerUrl;
				$scope.otherCollections = data.otherCollections;
				// $scope.dresses = collection.dresses;
				var user = obj.user;
				$rootScope.currentUser = user;
				$scope.$route = $route;
				$scope.$location = $location;
				$scope.$routeParams = $routeParams;
				// console.log('$route =', $route);
				// console.log('$scope.dresses =', $scope.dresses);
				// $scope.pop = false;
				$document.ready(function () {
					// console.log('Hello World');
					var url = '/api/collectionScroll/' + collectionKey;
					$('#load-more').hide();
					sessionStorage.setItem('sessionScroll', 0);
					sessionStorage.setItem('noDataRemained', false);
					wdDressesInit();
					jQuery('#load-more').click(function(){
						$('#loading_bar').show();
						$('#load-more').hide();
						wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, true);
					});
					var ajax = false;
					if (!ajax) {
						ajax = true;
						wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, false);
						ajax = false;
					}
					window.onscroll = function(ev) {
						if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
							if (!ajax) {
								ajax = true;
								wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage);
								ajax = false;
							}
						}
					};
					// remove the paginator when we're done.
					jQuery(document).ajaxError(function(e,xhr,opt){
						if (xhr.status == 404) jQuery('#load-more').remove();
					});
				});
			}
		})
		.error(function(data, status, headers, config) {
			$scope.status = status;
		});
	}
);


/**
 * @controller:		AppController
 * @description:	This controller opens dress page in a new window.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/29/2014
 * @last modified: 	01/12/2015
 * @called by:		<img class="clickable" src="{{dress[4]}}" width="{{dress[5]}}" height="{{dress[6]}}" ng-click="showDress(dress[8])">
 *					 in php/public/templates/designer.html
 */
wdApp.controller('AppController', function ($scope, $rootScope, $http, $document, $compile, $location, AUTH_EVENTS, AuthService, Session) {
	// console.log('window.location.pathname =', window.location.pathname);
	// $scope.currentUser = null;
	// $scope.userRoles = USER_ROLES;
	$scope.isAuthorized = AuthService.isAuthorized;
	// var path = window.location.pathname;
	// console.log('path =', path);

	// console.log('$location.$$path =', $location.$$path);	// use $location.$$path
	$scope.$location = $location;
	$scope.$path = $location.$$path;
	$scope.pop = false;
	// var path = $location.$$path;
	// // if ($location.$$path == '/') $scope.$home = true;
	// // console.log('path =', path);
	// console.log('path =', path);
	// if (path === '/') $scope.home = true;
	// else  $scope.home = false;
	/*
	$document.ready(function () {
		console.log('path =', path);
		if (path === '/') $scope.home = true;
		else  $scope.home = false;
		// console.log('path =', path);
	});
	*/

	$scope.setCurrentUser = function (user) {
		// console.log('AppController user =', user);
		if (user && !$scope.currentUser) {
			// console.log('Ouch');
			$scope.currentUser = user;
			// Session.create(user.id, user.username);
			// console.log('user =', user);
			// console.log('$scope.currentUser =', $scope.currentUser);
			// $scope.setCurrentUser(user);
			// console.log('$scope.currentUser =', $scope.currentUser);
			// $scope.$apply();
		} else $scope.currentUser = false;
		// $scope.currentUser = user;
		// $scope.$apply();
	};
	$scope.logout = function () {
		// console.log('logout');
		AuthService.logout();
		// $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
		$scope.setCurrentUser(false);
		// console.log('AppController $scope.currentUser =', $scope.currentUser);
		/*
		AuthService.logout().then(function () {
			console.log('AuthService.logout()');
			$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
			$scope.setCurrentUser(false);
		}, function () {
			// console.log(AUTH_EVENTS.loginFailed);
			// $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		});
		*/
	};
	$scope.openWindow = function(url) {
		if (url) {
			// console.log('url =', url);
			// console.log("url.indexOf('/') =", url.indexOf('/'));
			if (url.indexOf('.com') > -1) window.open(url);
			else if (url.indexOf('/') === 0) window.open(url);
		}
	};


	/**
	 * @function name:	showDress = function(dressId)
	 * @description:	This function opens dress page in a new window.
	 * @related issues:	WD-112
	 * @param:			string dressId
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			12/16/2014
	 * @last modified: 	01/30/2015
	 * @called by:		<img class="clickable" src="{{dress[4]}}" width="{{dress[5]}}" height="{{dress[6]}}" ng-click="showDress(dress[8])">
	 *					 in php/public/templates/designer.html
	 */
	$scope.showDress = function(dressId) {
		// console.log('dressId =', dressId);
		if (dressId) {
			if (dressId < 0) {
				window.open('/beginners-guide-to-wedding-dresses');
			} else window.open('/dress/' + dressId);
		}
	};


	/**
	 * @function name:	$scope.clickHeart = function(dressId, strFavorite)
	 * @description:	This function sends AJAX requests to add or remove favorite and
	 *					 changes color of heart icon once AJAX response received.
	 * @related issues:	WD-112, WD-089, WD-028
	 * @param:			string divId
	 * @param:			string strFavorite
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			07/07/2014
	 * @last modified: 	01/12/2015
	 * @called by:		<img class="clickable" ng-src="{{pic[0]}}" width="{{pic[1]}}" height="{{pic[2]}}" ng-click="reloadImg(pic[3])">
	 *					 in php/public/templates/dress.html
	 */
	$scope.clickHeart = function(dressId, strFavorite)
	{
		// console.log('$scope.clickHeart = function(divId, strFavorite)');
		var divId = 'heart_' + dressId;
		var buttonLove = angular.element(document.querySelector('#' + divId));
		// console.log('buttonLove =', buttonLove);
		if (buttonLove) {
			// var buttonLoveClass = buttonLove.attr('class');
			// console.log('buttonLoveClass =', buttonLoveClass);
			// var buttonLoveClass = buttonLove.getAttribute('class');
			var buttonLoveText = buttonLove.text();
			var buttonLoveHtml = buttonLove.html();
			// console.log('buttonLoveText =', buttonLoveText);
			// if (buttonLoveClass.indexOf('loved') > -1) {
			if (buttonLoveText.indexOf('LOVE THIS') > -1) {
				// console.log('buttonLoveHtml =', buttonLoveHtml);
				buttonLoveHtml = buttonLoveHtml.replace('LOVE THIS', 'LOVED');
				// <div id="heart_icon_6488" class="favorite_heart">♥</div>
				// buttonLove.text('LOVED');
				buttonLove.html(buttonLoveHtml);
				// $compile(buttonLove)($scope);
			} else if (buttonLoveText.indexOf('LOVED') > -1) {
				// var buttonLoveHtml = buttonLove.html();
				// console.log('buttonLoveHtml =', buttonLoveHtml);
				buttonLoveHtml = buttonLoveHtml.replace('LOVED', 'LOVE THIS');
				// console.log('buttonLoveHtml =', buttonLoveHtml);
				buttonLove.html(buttonLoveHtml);
			}
		}
		var postData = {};
		postData.strFavorite = strFavorite;
		$http.post('/api/favorites', postData)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				// console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				$scope.messages = obj.messages;
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
	};


	/**
	 * @function name:	$scope.loginPopup = function()
	 * @description:	This function opens dress page in a new window.
	 * @related issues:	WD-112
	 * @param:			void
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			12/18/2014
	 * @last modified: 	12/25/2014
	 * @called by:		<img class="clickable" src="{{dress[4]}}" width="{{dress[5]}}" height="{{dress[6]}}" ng-click="showDress(dress[8])">
	 *					 in php/public/templates/designer.html
	 */
	$scope.loginPopup = function() {
	// function loginPopup() {
		// console.log('loginPopup()');
		var fade_y = document.body.scrollTop;
		var light_y = document.body.clientHeight;
		// console.log('window.screen.availHeight =', window.screen.availHeight);
		// console.log('window.screen.availWidth =', window.screen.availWidth);
		// console.log('\n\n\n');
		// console.log('window.scrollY =', window.scrollY);
		// console.log('window.innerHeight =', window.innerHeight);
		// console.log('document.body.offsetHeight =', document.body.offsetHeight);
		// console.log('\n\n\n');
		// console.log('document.body.scrollTop =', document.body.scrollTop);
		// console.log('document.body.clientHeight =', window.scrollY);

		light_y = fade_y + (window.innerHeight * 0.35);

		// var fade_y = document.body.scrollTop + window.scrollY;
		// var light_y = document.body.clientHeight + window.scrollY;
		// var fade_y = document.body.scrollTop - window.innerHeight;
		// var fade_y = document.body.scrollTop - (window.innerHeight / 2);
		// var fade_y = document.body.scrollTop;
		// var light_y = (document.body.clientHeight * 0.35) + fade_y;
		// var light_y = (window.innerHeight * 0.35) + fade_y;
		// var light_y = document.body.scrollTop - (window.innerHeight * 0.15);
		// light_y = light_y * 0.35 + fade_y;
		// $scope.light_top = '"top":"' + light_y + 'px"';
		$scope.light_style = {'top': + light_y + 'px'};
		// $scope.light_top = {'top': + fade_y + 'px'};
		// $scope.light_top = {'top': + '35%'};
		// $scope.light_top = 'top:-120px;';
		// $scope.light_top = 'top:0px;';
		// $scope.fade_top = 'top:' + fade_y + 'px; position:absolute; width:100%; height:100%; background-color:black; z-index:30;opacity:.80;';
		// $scope.fade_top = '"top":"' + fade_y + 'px"';
		// $scope.fade_top = {'top': + fade_y + 'px', 'width':'1920px', 'height':'1055px'};

		// $scope.fade_top = {'top': fade_y + 'px', 'width':'1920px', 'height':'1055px'};
		$scope.fade_style = {
			'top': fade_y + 'px',
			'width': window.screen.availWidth + 'px',
			'height': window.innerHeight + 'px'
		};

		// $scope.fade_top = '"top":"30px"; ';
		// $scope.fade_top = '"top":"0px"; "width":"1920px"; "height":"1055px";';
		// $scope.fade_top = 'top:50px;';
		// console.log('$scope.light_top =', $scope.light_top);
		// console.log('$scope.fade_top =', $scope.fade_top);
		window.onresize = function () {
			fade_y = document.body.scrollTop;
			light_y = fade_y + (window.innerHeight * 0.35);
			$scope.light_top = {'top': + light_y + 'px'};
			$scope.fade_top = {
				'top': fade_y + 'px',
				'width': window.screen.availWidth + 'px',
				'height': window.innerHeight + 'px'
			};
			// light_y = document.body.clientHeight;
			// light_y = light_y * 0.35 + fade_y;
			// document.getElementById('light').style.top = light_y;
		};
		
		// window.scrollTo(0,fade_y);
		window.onscroll = function(){
			document.body.scrollTop = fade_y;
			document.body.scrollLeft = 0;
		};
		document.onmousewheel = function(){ stopWheel(); }; /* IE7, IE8 */
		if (document.addEventListener){ /* Chrome, Safari, Firefox */
			document.addEventListener('DOMMouseScroll', stopWheel, false);
		}
		
		function stopWheel (e) {
			if (!e) { e = window.event; } /* IE7, IE8, Chrome, Safari */
			if (e.preventDefault) { e.preventDefault(); } /* Chrome, Safari, Firefox */
			e.returnValue = false; /* IE7, IE8 */
		}
		// document.getElementById('fade').style.top = fade_y;
		$scope.pop = true;
		// document.getElementById('light').style.display = 'block';
		// document.getElementById('fade').style.display = 'block';
		// console.log(document.getElementById('light'));
	};
	
	/**
	 * @function name:	$scope.loginPopupClose = function()
	 * @description:	This function opens dress page in a new window.
	 * @related issues:	WD-112
	 * @param:			void
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			12/18/2014
	 * @last modified: 	12/18/2014
	 * @called by:		<div id="fade" class="black_overlay" ng-show="pop" ng-click="loginPopupClose()">
	 *					 in php/public/templates/designer.html
	 */
	// function loginPopupClose()
	$scope.loginPopupClose = function() {
		// if (document.getElementById('light')) document.getElementById('light').style.display = 'none';
		// if (document.getElementById('fade')) document.getElementById('fade').style.display = 'none';
		$scope.pop = false;
		window.onscroll = null;
		document.onmousewheel = null;
	};

});











/**
 * @controller:		TagController
 * @description:	This function sets data for home page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			01/14/2015
 * @last modified: 	01/14/2015
 * @called by:		$routeProvider.when('/accents/:tag')
 *					$routeProvider.when('/color/:tag')
 *					$routeProvider.when('/fabric/:tag')
 *					$routeProvider.when('/neckline/:tag')
 *					$routeProvider.when('/silhouette/:tag')
 *					$routeProvider.when('/sleeves/:tag')
 *					$routeProvider.when('/train/:tag')
 *					$routeProvider.when('/season/:tag')
 *					$routeProvider.when('/style/:tag')
 *					$routeProvider.when('/venue/:tag')
 */
wdApp.controller('TagController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	// var tag = $routeParams.tag;
	// console.log('tag =', tag);
	$document.ready(function () {
		var url = '/api/home';
		// console.log('url =', url);
		$('#load-more').hide();
		sessionStorage.setItem('sessionScroll', 0);
		sessionStorage.setItem('noDataRemained', false);
		wdDressesInit();
		jQuery('#load-more').click(function(){
			$('#loading_bar').show();
			$('#load-more').hide();
			wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, true);
		});
		var ajax = false;
		if (!ajax) {
			ajax = true;
			wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, false);
			ajax = false;
		}
		window.onscroll = function(ev) {
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				if (!ajax) {
					// console.log('sessionStorage =', sessionStorage);
					ajax = true;
					wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage);
					ajax = false;
				}
			}
		};
		// remove the paginator when we're done.
		jQuery(document).ajaxError(function(e,xhr,opt){
			if (xhr.status == 404) jQuery('#load-more').remove();
		});
	});
});

















/**
 * @controller:		HomeController
 * @description:	This function sets data for home page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/26/2014
 * @last modified: 	01/29/2015
 * @called by:		<div ng-if="home" ng-controller="HomeController" id="container" class="transitions-enabled clearfix" style="overflow:hidden; margin:0 auto; margin-bottom: 120px; position: relative; width: 80%;"></div>
 *					 in php/public/index.html
 */
wdApp.controller('HomeController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	// console.log('$route =', $route);
	// console.log('$location =', $location);
/*
	console.log('$routeParams =', $routeParams);
	// var keywords = Object.keys($routeParams);
	var keywords = [];
	for (var i in $routeParams) {
		console.log('$routeParams[i] =', $routeParams[i]);
		if ($routeParams[i] === 'on') keywords.push(i);
	}
	console.log('keywords =', keywords);
*/
	// var keywords = getSearchKeywordsByUrl($routeParams);

	// console.log('HomeController');
	// $rootScope.home = true;
	// $rootScope.homeStyle = 'block;';
	// $rootScope.homeStyle = {overflow:hidden; margin:0 auto; margin-bottom: 120px; position: relative; width: 80%};
	// $scope.home = true;
	// $scope.pop = false;
	// angular.element(document).ready(function () {
	$document.ready(function () {
		$('#clock').countdown("2020/10/10", function(event) {
			var totalHours = event.offset.totalDays * 24 + event.offset.hours;
			$(this).html(event.strftime(totalHours + ' hr %M min %S sec'));
		});
/*
		// var url = '/api/designerScroll/' + designerKey;
		var url = '/api/home';
		// console.log('url =', url);
		$('#load-more').hide();
		// sessionStorage.setItem('sessionScroll', 0);
		sessionStorage.setItem('sessionScroll', 0);
		sessionStorage.setItem('noDataRemained', false);
		wdDressesInit();
		jQuery('#load-more').click(function(){
			$('#loading_bar').show();
			$('#load-more').hide();
			wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, true);
		});
		var ajax = false;
		if (!ajax) {
			ajax = true;
			wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, false);
			ajax = false;
		}
		window.onscroll = function(ev) {
			// console.log('window.innerHeight =', window.innerHeight);
			// console.log('window.scrollY =', window.scrollY);
			// console.log('document.body.offsetHeight =', document.body.offsetHeight);
			if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
				if (!ajax) {
					// console.log('sessionStorage =', sessionStorage);
					ajax = true;
					wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage);
					ajax = false;
				}
			}
		};
		// remove the paginator when we're done.
		jQuery(document).ajaxError(function(e,xhr,opt){
			if (xhr.status == 404) jQuery('#load-more').remove();
		});
*/
	});
	// console.log('$route =', $route);
	// console.log('$routeParams =', $routeParams);
});


/**
 * @controller:		DesignerController
 * @description:	This function sets data for designer page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/16/2014
 * @last modified: 	12/26/2014
 * @called by:		$routeProvider.when('/designer/:designerKey')
 */
wdApp.controller('DesignerController', function($scope, $rootScope, $http, $route, $routeParams, $location, $document, $compile) {
	var designerKey = $routeParams.designerKey;
	// var designerKey = 'berta';
	console.log('designerKey =', designerKey);
	// var urlApiDesigner = '/api/designer/' + designerKey;

	//$http.get('/api/designer/berta')
	$http.get('/api/designer/' + designerKey)
	// $http.get(urlApiDesigner)
		.success(function(data, status, headers, config) {
			var obj = JSON.parse(data);
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj =', obj);
			// console.log('obj.status =', obj.status);
			if (obj.status === 'FOUND') {
				var designer = obj.data;
				// console.log('designer =', designer);
				$scope.designer = designer.designer;
				$scope.collections = designer.collections;
				$scope.dresses = designer.dresses;
				var user = obj.user;
				$rootScope.currentUser = user;
				$scope.$route = $route;
				$scope.$location = $location;
				$scope.$routeParams = $routeParams;
				// console.log('$route =', $route);
				// console.log('$location =', $location);
				// console.log('typeof $location =', typeof $location);
				// console.log('$location.$$path =', $location.$$path);	// use $location.$$path
				// console.log('$location.$$host =', $location.$$host);
				// console.log('$location.$$url =', $location.$$url);
				// console.log('$routeParams =', $routeParams);

				// console.log('$scope.route =', $scope.route);
				// console.log('$scope.location =', $scope.location);
				// console.log('$scope.routeParams =', $scope.routeParams);

				// console.log('$scope.designer =', $scope.designer);
				// console.log('$scope.collections =', $scope.collections);
				// console.log('$scope.dresses =', $scope.dresses);
				// $scope.pop = false;

				// angular.element(document).ready(function () {
				$document.ready(function () {
					// console.log('Hello World');
					var url = '/api/designerScroll/' + designerKey;
					$('#load-more').hide();
					sessionStorage.setItem('sessionScroll', 0);
					sessionStorage.setItem('noDataRemained', false);
					wdDressesInit();
					jQuery('#load-more').click(function(){
						$('#loading_bar').show();
						$('#load-more').hide();
						wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, true);
					});
					var ajax = false;
					if (!ajax) {
						ajax = true;
						wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, false);
						ajax = false;
					}
					window.onscroll = function(ev) {
						// console.log('scroll!');
						// console.log('window.innerHeight =', window.innerHeight);
						// console.log('window.scrollY =', window.scrollY);
						// console.log('document.body.offsetHeight =', document.body.offsetHeight);
						if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
							if (!ajax) {
								// console.log('bottom!');
								// console.log('sessionStorage =', sessionStorage);
								ajax = true;
								wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage);
								ajax = false;
							}
						}
					};
					// remove the paginator when we're done.
					jQuery(document).ajaxError(function(e,xhr,opt){
						if (xhr.status == 404) jQuery('#load-more').remove();
					});
				});
			}
			// console.log('$route =', $route);
			// console.log('$routeParams =', $routeParams);
		})
		.error(function(data, status, headers, config) {
			$scope.status = status;
		});
	}
);


/**
 * @controller:		DressController
 * @description:	This function sets data for dress page.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/16/2014
 * @last modified: 	01/08/2014
 * @called by:		$routeProvider.when('/dress/:dressId')
 */
wdApp.controller('DressController', function($scope, $rootScope, $http, $route, $routeParams, $location) {
	var dressId = $routeParams.dressId;
	// console.log('dressId =', dressId);


	/**
	 * @function name:	$scope.clickHeart = function(dressId, strFavorite)
	 * @description:	This function sends AJAX requests to add or remove favorite and
	 *					 changes color of heart icon once AJAX response received.
	 * @related issues:	WD-112, WD-089, WD-028
	 * @param:			string divId
	 * @param:			string strFavorite
	 * @return:			void
	 * @author:			Don Hsieh
	 * @since:			07/07/2014
	 * @last modified: 	01/08/2015
	 * @called by:		<img class="clickable" ng-src="{{pic[0]}}" width="{{pic[1]}}" height="{{pic[2]}}" ng-click="reloadImg(pic[3])">
	 *					 in php/public/templates/dress.html
	 */
	$scope.clickHeartStatic = function(dressId, strFavorite)
	// function clickHeart(dressId, strFavorite)
	{
		// console.log('$scope.clickHeartStatic = function(divId, strFavorite)');
		// console.log('strFavorite =', strFavorite);
		// $http.post('/api/edit', user)
		var postData = {};
		postData.strFavorite = strFavorite;
		// postData = strFavorite;
		// console.log('postData =', postData);
		// $http.post('/api/favorite', strFavorite)
		$http.post('/api/favorites', postData)
			.success(function(data, status, headers, config) {
				// console.log('POST return');
				// console.log('data =', data);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				// console.log('obj =', obj);
				// var messages = obj.messages;
				// console.log('messages =', messages);
				$rootScope.messages = obj.messages;
				// console.log('$scope.buttonLoveText =', $scope.buttonLoveText);
				// $rootScope.buttonLoveText = obj.buttonLoveText;
				$scope.buttonLoveText = obj.buttonLoveText;
				// console.log('$scope.buttonLoveText =', $scope.buttonLoveText);
				// console.log('$scope =', $scope);
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
			});
	};


	$http.get('/api/dress/' + dressId)
		.success(function(data, status, headers, config) {
			// console.log('data =', data);
			var obj = JSON.parse(data);
			// console.log('obj =', obj);
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj =', obj);
			// console.log('obj.status =', obj.status);
			if (obj.status === 'FOUND') {
				var dress = obj.data;
				// console.log('dress =', dress);
				//$scope.dress = dress; // response data
				$scope.collection = dress[0];
				$scope.designer = dress[1];
				$scope.dress = dress[2];
				$scope.image = dress[3];
				$scope.pin = dress[4];
				$scope.thumbs = dress[5];
				$scope.types = dress[6];
				$scope.isFavorite = dress[7];
				$scope.favorite = dress[8];
				if (dress[7]) {		// isFavorite
					$scope.buttonLoveText = 'Remove from favorites';
				} else {
					$scope.buttonLoveText = 'LOVE THIS';
				}

				// console.log('pin =', dress[4]);
				// console.log('$scope.isFavorite =', $scope.isFavorite);
				// console.log('$scope.favorite =', $scope.favorite);

				var user = obj.user;
				$rootScope.currentUser = user;
				// console.log('DressController $rootScope.currentUser =', $rootScope.currentUser);

				// $rootScope.currentUser = user;
				$scope.$route = $route;
				$scope.$location = $location;
				$scope.$routeParams = $routeParams;
				/**
				 * @function name:	reloadImg = function(imageName)
				 * @description:	This function splits a string and returns an array.
				 * @related issues:	WD-112
				 * @param:			string imageName
				 * @return:			void
				 * @author:			Don Hsieh
				 * @since:			12/05/2014
				 * @last modified: 	12/05/2014
				 * @called by:		<img class="clickable" ng-src="{{pic[0]}}" width="{{pic[1]}}" height="{{pic[2]}}" ng-click="reloadImg(pic[3])">
				 *					 in php/public/templates/dress.html
				 */
				$scope.reloadImg = function(imageName) {
					var img = document.getElementById('dressMainImg');
					img.src = imageName;
				};
			}
		})
		.error(function(data, status, headers, config) {
			$scope.status = status;
		});
	}
);

wdApp.service('Session', function () {
	// console.log('Session service hihi');
	// this.create = function (sessionId, userId, userRole) {
	// this.create = function (userId, username, dressIds) {
	this.create = function (userId, username) {
		// console.log('Create session');
		// console.log('userId =', userId);
		// console.log('username =', username);
		// console.log('dressIds =', dressIds);
		this.userId = userId;
		this.username = username;
		// this.dressIds = dressIds;
	};
	this.destroy = function () {
		// console.log('Destroy session');
		// this.id = null;
		this.userId = null;
		this.username = null;
		this.dressIds = null;
		// console.log('Destroy session YOYO');
		// console.log('this =', this);
		// return this;
		// this.userRole = null;
	};
	// console.log('this =', this);
	return this;
});

wdApp.factory('AuthService', function ($http, Session) {
// wdApp.factory('AuthService', function ($http) {
	var authService = {};

	authService.login = function (credentials) {
		// console.log('credentials =', credentials);
		// credentials = credentials.username;
		return $http
		.post('/api/login', credentials)
		.then(function (res) {
			// console.log('res =', res);
			// console.log('res.data =', res.data);
			var obj = JSON.parse(res.data);
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj =', obj);
			// console.log('obj.status =', obj.status);
			if (obj.status === 'LOGIN') {
				var data = obj.data;
				// console.log('$scope.currentUser =', $scope.currentUser);
				// console.log('data =', data);
				// console.log('data.id =', data.id);
				// Session.create(res.data.id, res.data.user.id, res.data.user.role);
				// Session.create(res.data.id, res.data.user.id);
				Session.create(data.id, data.username);
				// Session.create(data.id, data.username, data.dressIds);
				// console.log('$scope.currentUser =', $scope.currentUser);
				return data;
			}
			// } else console.log(obj.status);
			// return res.data;
			// return res.data.user;
		});
	};

	authService.logout = function () {
		// console.log('authService.logout hihi');
		return $http
		.post('/api/logout')
		.then(function (res) {
			// console.log('res =', res);
			// var data = res.data;
			// console.log('data =', data);
			// console.log('data.id =', data.id);
			// Session.create(res.data.id, res.data.user.id, res.data.user.role);
			// Session.create(res.data.id, res.data.user.id);
			Session.destroy();
			// return data;
			// return data;
			// return res.data;
			// return res.data.user;
		});

		// return Session.destroy();
		// console.log('authService.logout done');
		// return true;
	};

	authService.isAuthenticated = function () {
		return !!Session.userId;
	};

	authService.isAuthorized = function (authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	return authService;
});

wdApp.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
});


wdApp.controller('LoginController', function($scope, $rootScope, AUTH_EVENTS, AuthService) {
// wdApp.controller('LoginController', function($scope, $rootScope) {
	$scope.credentials = {
		username: '',
		password: ''
	};
	$scope.login = function (credentials) {
		// console.log('credentials =', credentials);
		AuthService.login(credentials).then(function (user) {
			// console.log('AuthService user =', user);
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.setCurrentUser(user);
		}, function () {
			console.log(AUTH_EVENTS.loginFailed);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		});
	};
});


/**
 * @function name:	function wdDressesInit()
 * @description:	This function initializes pin layout.
 * @related issues:	WD-112
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			12/16/2014
 * @last modified: 	12/16/2014
 * @called by:		$document.ready()
 *					 in php/public/js/app.js
 */
function wdDressesInit() {
	var $container = $('#container').css({ visibility: 'hidden' });
	var container = document.querySelector('#container');
	// console.log('container =', container);
	container.style.visibility = 'hidden';
	// initialize Masonry
	var msnry = new Masonry(container, {
		itemSelector: '.item',
		columnWidth: 238,
		gutter: 11,
		isOriginLeft: true,
		isFitWidth: true,
		isInitLayout: false
	});
	// console.log('msnry =', msnry);
	// layout Masonry again after all images have loaded
	imagesLoaded(container, function() {
		// console.log('msnry.layout() start');
		msnry.layout();
		// console.log('msnry.layout() complete');
		container.style.visibility = 'visible';
		$container.masonry({
			itemSelector: '.item',
			columnWidth: 238,
			gutter: 11,
			isOriginLeft: true,
			isFitWidth: true,
			//isInitLayout: false
		});
	});
}


/**
 * @function name:	function wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, limit)
 * @description:	This function handles infinite scroll.
 * @related issues:	WD-112, WD-052
 * @param:			string url
 * @param:			object $http
 * @param:			object $compile
 * @param:			object $scope
 * @param:			object $routeParams
 * @param:			object sessionStorage
 * @param:			integer limit
 * @return:			void
 * @author:			Don Hsieh
 * @since:			11/24/2014
 * @last modified: 	01/29/2015
 * @called by:		function wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage)
 *					 in sail/assets/js/wd.js
 *					jQuery('#load-more').click(function(){});
 *					 in sail/views/home/index.jade
 *					 in sail/views/designer/find.jade
 */
function wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, limit, stop)
{
	// console.log('AJAX start');
	// console.log('sessionStorage =', sessionStorage);
	// console.log('url =', url);
	var keywords = getSearchKeywordsByUrl($routeParams);
	if (keywords.length) {
		console.log('keywords =', keywords);
		console.log('keywords.length =', keywords.length);
	}
	var tags = [];
	if ($routeParams.tag) tags = $routeParams.tag;
	if (tags.length) {
		console.log('tags =', tags);
		console.log('tags.length =', tags.length);
	}
	// if (tag && keywords.indexOf(tag) === -1) keywords.push(tag);
	// console.log('keywords =', keywords);
	// var arr = [];

	var ajaxStart = getMilliSec();
	$('#loading_bar').show();
	// if (keywords.length > 0 || tags.length > 0) {
	if (keywords.length > 0 || tags.length > 0 || true) {
		var arr = {};
		arr.keywords = keywords;
		arr.tag = $routeParams.tag;
		var sessionScroll = sessionStorage.getItem('sessionScroll');
		arr.sessionScroll = sessionScroll;
		arr.stop = stop;

		// console.log('ajaxStart =', ajaxStart);
		if (sessionStorage.getItem('ajax') != 'on') {
			sessionStorage.setItem('ajax', 'on');
			$http.post(url, arr)
				.success(function(data, status, headers, config) {
					// console.log('data =', data);
					var ajaxEnd = getMilliSec();
					// console.log('ajaxEnd =', ajaxEnd);
					var ajaxDuration = ajaxEnd - ajaxStart;
					// console.log('ajaxDuration =', ajaxDuration);
					console.log('\n');
					console.log('PHP Duration =', ajaxDuration / 1000);
					var obj = {};
					if (typeof(data) === 'string') {
						obj = JSON.parse(data);
						// console.log('obj =', obj);
					} else if (typeof(data) === 'object') obj = data;
					if (typeof(obj) === 'string') {
						// console.log('still string, JSON.parse second times');
						obj = JSON.parse(obj);
					} else obj = obj;
					console.log('obj =', obj);
					// console.log('scroll =', obj.sessionScroll);
					// console.log('offset =', obj.offset);
					// // console.log('obj.type_sessionScroll =', obj.type_sessionScroll);
					// console.log('stop =', obj.stop);
					// console.log('showAd =', obj.showAd);
					// console.log('scrollSg =', obj.scrollSg);
					// console.log('scrollSgSession =', obj.scrollSgSession);
					
					// console.log('obj.type_stop =', obj.type_stop);

					// console.log('obj.bounds =', obj.bounds);
					// console.log('obj.lastIndex =', obj.lastIndexBound);
					

					var messages = obj.messages;
					// console.log('messages =', messages);
					$scope.messages = messages;
					// console.log('$scope.messages =', $scope.messages);
					// // $rootScope.messages = messages;
					var user = obj.user;
					$scope.setCurrentUser(user);
					if (obj.status === 'REDIRECT') {
						var url = '';
						var path = window.location.pathname;
						// console.log('path =', path);
						var tags = obj.tags;
						// console.log('tags =', tags);
						if (tags.length > 0) {
							var query = tags.join('=on&');
							url = path + '?' + query + '=on';
						} else url = path;
						// console.log('url =', url);
						// window.location.replace(url);	//temp
						window.location.replace(url);
					} else if (obj.status === 'FOUND') {
						var dresses = obj.data;
						// $scope.currentUser = user;
						// $scope.$parent.currentUser = user;
						// $rootScope.messages = null;
						// $scope.messages = null;
						// console.log('dresses =', dresses);
						var html = getPinsFromJsonToHtml(dresses);
						// console.log('html =', html);
						
						var el = angular.element(html);
						// el = angular.element(html);
						// console.log('el =', el);
						// console.log('el.length =', el.length);
						// contentTr.insertAfter(element);
						// $compile(contentTr)(scope);

						if (limit > el.length) {
							limit = el.length;
						} else {}
						// console.log('el.length =', el.length);
						// console.log('limit =', limit);

						// if (el.length <= 15) {
						if (el.length <= limit) {
							// jQuery("#container").append(el).masonry('appended', el, true);
							jQuery("#container").masonry().append(el).masonry('appended', el, true);
							$compile(el)($scope);
							// if (el.length < 15) {
							if (el.length < limit) {
								// console.log('Last batch');
								sessionStorage.setItem('noDataRemained', 'exhausted');
							}
						}
					}
					var sessionScroll = sessionStorage.getItem('sessionScroll');
					sessionScroll++;
					sessionStorage.setItem('sessionScroll', sessionScroll);
					// console.log('sessionScroll =', sessionScroll);
					$('#loading_bar').hide();
					sessionStorage.setItem('ajax', 'off');
					var angularEnd = getMilliSec();
					// console.log('angularEnd =', angularEnd);
					var angularDuration = angularEnd - ajaxEnd;
					// console.log('angularDuration =', angularDuration);
					console.log('Frontend Duration =', angularDuration / 1000);
				})
				.error(function(data, status, headers, config) {
					var ajaxEnd = getMilliSec();
					$scope.status = status;
					$('#loading_bar').hide();
					sessionStorage.setItem('ajax', 'off');
					var angularEnd = getMilliSec();
					// console.log('angularEnd =', angularEnd);
					var angularDuration = angularEnd - ajaxEnd;
					// console.log('angularDuration =', angularDuration);
					console.log('Frontend Duration =', angularDuration / 1000);
				});
		} else {}
	} else {
		// ajaxStart = getMilliSec();
		// console.log('ajaxStart =', ajaxStart);
		$http.get(url)
			.success(function(data, status, headers, config) {
				// console.log('data =', data);
				var ajaxEnd = getMilliSec();
				// console.log('ajaxEnd =', ajaxEnd);
				var ajaxDuration = ajaxEnd - ajaxStart;
				// console.log('ajaxDuration =', ajaxDuration);
				console.log('\n');
				console.log('PHP Duration =', ajaxDuration / 1000);
				var obj = {};
				if (typeof(data) === 'string') {
					obj = JSON.parse(data);
					// console.log('obj =', obj);
				} else if (typeof(data) === 'object') obj = data;
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
				console.log('scroll =', obj.scroll);
				console.log('scrollAd =', obj.scrollAd);
				// console.log('pickRandomDressIdsDuration =', obj.data.pickRandomDressIdsDuration);
				// console.log('parsePinsDuration =', obj.parsePinsDuration);
				// console.log('pickRandomDressIdsDuration =', obj.pickRandomDressIdsDuration);
				// console.log('pickRandomDressIdsByShuffleDuration =', obj.pickRandomDressIdsByShuffleDuration);
				// console.log('pickRandomDressIdsByShuffleDuration2 =', obj.pickRandomDressIdsByShuffleDuration2);
				// console.log('pickRandomDressIdsByShuffleDuration2b =', obj.pickRandomDressIdsByShuffleDuration2b);
				// console.log('pickRandomDressIdsByShuffleDuration3 =', obj.pickRandomDressIdsByShuffleDuration3);
				// console.log('pickRandomDressIdsByShuffleDuration4 =', obj.pickRandomDressIdsByShuffleDuration4);
				// console.log('pickRandomDressIdsByShuffleDuration5 =', obj.pickRandomDressIdsByShuffleDuration5);
				// console.log('pickRandomDressIdsByShuffleDuration6 =', obj.pickRandomDressIdsByShuffleDuration6);
				// console.log('pickRandomDressIdsByShuffleDuration7 =', obj.pickRandomDressIdsByShuffleDuration7);
				// console.log('pickRandomDressIdsDuration8 =', obj.pickRandomDressIdsDuration8);
				// console.log('mt_randDuration =', obj.mt_randDuration);
				// console.log('blockAssignmentDuration =', obj.blockAssignmentDuration);

				// console.log('getKeyDuration =', obj.getKeyDuration);
				// console.log('getRowDuration =', obj.getRowDuration);
				// console.log('in_arrayDuration =', obj.in_arrayDuration);
				var messages = obj.messages;
				// console.log('messages =', messages);
				$scope.messages = messages;
				// console.log('$scope.messages =', $scope.messages);
				// // $rootScope.messages = messages;
				var user = obj.user;
				$scope.setCurrentUser(user);
				if (obj.status === 'REDIRECT') {
					var url = '';
					var path = window.location.pathname;
					// console.log('path =', path);
					var tags = obj.tags;
					// console.log('tags =', tags);
					if (tags.length > 0) {
						var query = tags.join('=on&');
						url = path + '?' + query + '=on';
					} else url = path;
					// console.log('url =', url);
					// window.location.replace(url);	//temp
					window.location.replace(url);
				} else if (obj.status === 'FOUND') {
					var dresses = obj.data;
					// $scope.currentUser = user;
					// $scope.$parent.currentUser = user;
					// $rootScope.messages = null;
					// $scope.messages = null;
					// console.log('dresses =', dresses);
					var html = getPinsFromJsonToHtml(dresses);
					// console.log('html =', html);
					
					var el = angular.element(html);
					// el = angular.element(html);
					// console.log('el =', el);
					// console.log('el.length =', el.length);
					// contentTr.insertAfter(element);
					// $compile(contentTr)(scope);

					if (limit > el.length) {
						limit = el.length;
					} else {}
					// console.log('el.length =', el.length);
					// console.log('limit =', limit);

					// if (el.length <= 15) {
					if (el.length <= limit) {
						// jQuery("#container").append(el).masonry('appended', el, true);
						jQuery("#container").masonry().append(el).masonry('appended', el, true);
						$compile(el)($scope);

						// if (el.length < 15) {
						if (el.length < limit) {
							// console.log('Last batch');
							sessionStorage.setItem('noDataRemained', 'exhausted');
						}
					}
				}
				var sessionScroll = sessionStorage.getItem('sessionScroll');
				sessionScroll++;
				sessionStorage.setItem('sessionScroll', sessionScroll);
				// console.log('sessionScroll =', sessionScroll);
				$('#loading_bar').hide();
				var angularEnd = getMilliSec();
				// console.log('angularEnd =', angularEnd);
				var angularDuration = angularEnd - ajaxEnd;
				// console.log('angularDuration =', angularDuration);
				console.log('Frontend Duration =', angularDuration / 1000);
			})
			.error(function(data, status, headers, config) {
				$scope.status = status;
				$('#loading_bar').hide();
			});
	}
	// console.log('arr =', arr);
	
	// $http.post(url, keywords)
	
/*
	$http.get(url)
		.success(function(data, status, headers, config) {
			// console.log('POST return');
			// console.log('data =', data);
			var obj = {};
			if (typeof(data) === 'string') {
				obj = JSON.parse(data);
				// console.log('obj =', obj);
			} else if (typeof(data) === 'object') obj = data;
			if (typeof(obj) === 'string') {
				// console.log('still string, JSON.parse second times');
				obj = JSON.parse(obj);
			} else obj = obj;
			// console.log('obj =', obj);
			var messages = obj.messages;
			// console.log('messages =', messages);
			$rootScope.messages = messages;
		})
		.error(function(data, status, headers, config) {
			$scope.status = status;
		});
*/
/*
	jQuery.ajax({
		type: "POST",
		// type: "GET",
		// url: '/api/designer/' + designerKey,
		// url: '/api/designerScroll/' + designerKey,
		url: url,
		data: keywords,
		// data: keywords.serialize(),
		// data: 'ajax_data',
		cache: false,
		beforeSend: function() {
			$('#loading_bar').show();
		},
		complete: function(){
			$('#loading_bar').hide();
			// console.log('AJAX completed.');
		},
		success: function (data) {
			// console.log('data =', data);
			if (data.length > 0) {
				var obj = JSON.parse(data);
				if (typeof(obj) === 'string') {
					// console.log('still string, JSON.parse second times');
					obj = JSON.parse(obj);
				} else obj = obj;
				console.log('obj =', obj);
				// console.log('obj.status =', obj.status);
				if (obj.status === 'FOUND') {
					var dresses = obj.data;
					var user = obj.user;

					// $rootScope.currentUser = user;
					// console.log('$scope.currentUser =', $scope.currentUser);
					// console.log('$rootScope.currentUser =', $rootScope.currentUser);
					// console.log('user =', user);
					if (user && !$scope.currentUser) {
						// console.log('Ouch');
						// $scope.currentUser = user;
						// Session.create(user.id, user.username);
						$scope.setCurrentUser(user);
						$scope.$apply();
					}
					// $scope.currentUser = user;
					// $scope.$parent.currentUser = user;
					// $rootScope.messages = null;
					$scope.messages = null;
					// console.log('dresses =', dresses);
					var html = getPinsFromJsonToHtml(dresses);
					// console.log('html =', html);
					
					var el = angular.element(html);
					// el = angular.element(html);
					// console.log('el =', el);
					// console.log('el.length =', el.length);
					// contentTr.insertAfter(element);
					// $compile(contentTr)(scope);

					if (limit > el.length) {
						limit = el.length;
					} else {}
					// console.log('el.length =', el.length);
					// console.log('limit =', limit);

					// if (el.length <= 15) {
					if (el.length <= limit) {
						// jQuery("#container").append(el).masonry('appended', el, true);
						jQuery("#container").masonry().append(el).masonry('appended', el, true);
						$compile(el)($scope);

						// if (el.length < 15) {
						if (el.length < limit) {
							// console.log('Last batch');
							sessionStorage.setItem('noDataRemained', 'exhausted');
						}
					}
				}
			} else {
				console.log('No data received.');
			}
			var sessionScroll = sessionStorage.getItem('sessionScroll');
			sessionScroll++;
			sessionStorage.setItem('sessionScroll', sessionScroll);
			// console.log('sessionScroll =', sessionScroll);
		}
	});
*/
}


/**
 * @function name:	function wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage)
 * @description:	This function triggers load more pins if user scrolls to bottom of page five times.
 * @related issues:	WD-112, WD-052
 * @param:			string url
 * @param:			object $compile
 * @param:			object $scope
 * @param:			object sessionStorage
 * @return:			void
 * @author:			Don Hsieh
 * @since:			11/25/2014
 * @last modified:	01/06/2015
 * @called by:		window.onscroll = function(ev) {};
 *					 in sail/views/home/index.jade
 *					 in sail/views/designer/find.jade
 */
function wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage)
{
	// console.log('function wdBottomLoadMore(url, $http, $compile, $scope, $routeParams, sessionStorage)');
	var sessionScroll = sessionStorage.getItem('sessionScroll');
	var noData = sessionStorage.getItem('noDataRemained');
	// console.log('sessionScroll =', sessionScroll);
	// console.log('noData =', noData);
	if (noData !== 'exhausted') {
		if (sessionScroll > 2 && sessionScroll % 10 === 0) {
		// if (sessionScroll > 2 && sessionScroll % 5 === 0) {
		// if (sessionScroll > 2 && sessionScroll % 3 === 0) {
		// if (sessionScroll > 2 && sessionScroll % 1 === 0) {
			// console.log('sessionScroll =', sessionScroll);
			// console.log('noData =', noData);
			$('#load-more').show();
			// $scope.loadMoreVisible = true;
			// $scope.$apply();
			// $rootScope.loadMoreVisible = true;
			// console.log('loadMoreVisible is true');
			// console.log("$('#load-more').show()");
		} else if ($('#load-more').is(':hidden')) {
		// } else if ($scope.loadMoreVisible) {
			$('#load-more').hide();
			// $scope.loadMoreVisible = false;
			// $scope.$apply();
			// $rootScope.loadMoreVisible = false;
			// console.log('loadMoreVisible is false');
			wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, false);
			// wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, 15, true);
		}
	}
}


/**
 * @function name:	function getPinsFromJsonToHtml(dresses)
 * @description:	This function generates HTML tags by JSON data.
 * @related issues:	WD-112
 * @param:			array dresses
 * @return:			string html
 * @author:			Don Hsieh
 * @since:			12/16/2014
 * @last modified: 	01/12/2015
 * @called by:		$document.ready()
 *					 in php/public/js/app.js
 */
function getPinsFromJsonToHtml(dresses)
{
	var html = '';
	var div = '';
	var dress = [];
	var str = '';
	var arr = [];
	var dressId = '';
	var dressUrl = '';
	var dressName = '';
	var designerUrl = '';
	var designer = '';
	var src = '';
	var width = '';
	var height = '';
	var shopUrl = '';
	var click = '';
	var favoriteClass = '';
	var favoriteText = '';
	var center = '';
	var dress_bottom = '';
	var dress_designer = '';
	var dress_buttons = '';
	var btnShop = '';
	var btnHeart = '';

	for (var i in dresses) {
		arr = [];
		dress_bottom = '';
		dress = dresses[i];
		// console.log('dress =', dress);
		dressId = dress.id;
		// $dress = [$dressUrl, $dressName, $designerUrl, $designer, $img, $width, $height, $shopUrl, $id];
		dressUrl = dress[0];
		dressName = dress[1];
		designerUrl = dress[2];
		designer = dress[3];
		src = dress[4];
		width = dress[5];
		height = dress[6];
		shopUrl = dress[7];
		click = dress.click;
		favoriteClass = dress.favoriteClass;
		favoriteText = dress.favoriteText;
		// console.log('favoriteClass =', favoriteClass);
		// console.log('favoriteText =', favoriteText);
		// console.log('click =', click);
		// console.log('shopUrl =', shopUrl);

		// <div id="' + dressId + '" class="item">
		// 	<center>
		// 		<img class="clickable" src="' + src + '" width="' + width + '" height="' + height + '" ng-click="showDress(' + dressId + ')">
		// 	</center>
		// </div>

		// center = '<center><img class="clickable" src="' + src + '" width="' + width + '" height="' + height + '" ng-click="openWindow(/dress/' + dressId + ')"></center>';
		center = '<center><img class="clickable" src="' + src + '" width="' + width + '" height="' + height + '" ng-click="showDress(' + dressId + ')"></center>';

		if (designer) {
			if (dressName) {
				str = '<a href="' + dressUrl + '" class="link-pink-bold">' + dressName + '</a>';
				// console.log('str =', str);
				arr.push(str);
			}
			if (designer) {
				str = '<a href="' + designerUrl + '" class="link-pink-light">' + designer + '</a>';
				// console.log('str =', str);
				arr.push(str);
			}
			// console.log('arr =', arr);
			str = arr.join('<span> by </span>');
			// console.log('str =', str);
			dress_designer = '<div class="dress_designer">' + str + '</div>';

			shopUrl = "'" + shopUrl + "'";
			btnShop = '<div class="shop_dress" ng-click="openWindow(' + shopUrl + ')">SHOP THIS DRESS</div>';
			// btnHeart = '<div id="heart_' + dressId + '" class="' + favoriteClass + '" onclick="' + click + '"><div id="heart_icon_' + dressId + '" class="favorite_heart">&#9829;</div> ' + favoriteText + '</div>';
			btnHeart = '<div id="heart_' + dressId + '" class="' + favoriteClass + '" ng-click="' + click + '"><div id="heart_icon_' + dressId + '" class="favorite_heart">&#9829;</div> ' + favoriteText + '</div>';
			// btnHeart = '<div id="heart_' + dressId + '" class="' + favoriteClass + '" ng-click="loveThis(' + click + ')"><div id="heart_icon_' + dressId + '" class="favorite_heart">&#9829;</div> ' + favoriteText + '</div>';

			dress_buttons = '<div class="dress_buttons">' + btnShop + btnHeart + '</div>';
			dress_bottom = '<div class="dress_bottom">' + dress_designer + dress_buttons + '</div>';
		}
		div = '<div id="' + dressId + '" class="item">' + center + dress_bottom + '</div>';
		html += div;
	}
	return html;
}



var tagsUrl = ['beading', 'bow', 'bubble-hem', 'buttons', 'cascading-drape', 'corset', 'embroidery', 'feathers', 'flowers', 'jacket', 'peplum', 'pick-ups', 'pleating', 'rhinestones', 'ruching', 'ruffles', 'sash', 'tiers', 'waistband', 'zipper'
	, 'white-wedding-dresses', 'ivory-wedding-dresses', 'black-wedding-dresses', 'blue-wedding-dresses', 'blush-wedding-dresses', 'brown-wedding-dresses', 'burgundy-wedding-dresses', 'champagne-wedding-dresses', 'coral-wedding-dresses', 'gold-wedding-dresses', 'gray-wedding-dresses', 'green-wedding-dresses', 'lavender-wedding-dresses', 'olive-wedding-dresses', 'orange-wedding-dresses', 'pink-wedding-dresses', 'purple-wedding-dresses', 'red-wedding-dresses', 'silver-wedding-dresses', 'yellow-wedding-dresses'
	, 'charmeuse-wedding-dresses', 'chiffon-wedding-dresses', 'cotton-wedding-dresses', 'lace-wedding-dresses', 'linen-wedding-dresses', 'organza-wedding-dresses', 'satin-wedding-dresses', 'silk-wedding-dresses', 'taffeta-wedding-dresses', 'tulle-wedding-dresses', 'velvet-wedding-dresses', 'wool-wedding-dresses'
	, 'asymmetrical-wedding-dresses', 'backless-wedding-dresses', 'bateau-wedding-dresses', 'cowl-wedding-dresses', 'halter-wedding-dresses', 'high-neck-wedding-dresses', 'illusion-wedding-dresses', 'off-the-shoulder-wedding-dresses', 'one-shoulder-wedding-dresses', 'scoop-wedding-dresses', 'square-wedding-dresses', 'strapless-wedding-dresses', 'sweetheart-wedding-dresses', 'v-neck-wedding-dresses'
	, 'a-line-wedding-dresses', 'ball-gown-wedding-dresses', 'column-wedding-dresses', 'empire-wedding-dresses', 'fit-n-flare-wedding-dresses', 'mermaid-wedding-dresses', 'princess-wedding-dresses', 'sheath-wedding-dresses', 'trumpet-wedding-dresses'
	, 'asymmetrical-sleeve-wedding-dresses', 'cap-sleeve-wedding-dresses', 'half-sleeve-wedding-dresses', 'long-sleeve-wedding-dresses', 'short-sleeve-wedding-dresses', 'sleeveless-wedding-dresses', 'spaghetti-strap-wedding-dresses'
	, 'asymmetrical-train-wedding-dresses', 'brush-train-wedding-dresses', 'cathedral-train-wedding-dresses', 'chapel-train-wedding-dresses', 'court-train-wedding-dresses', 'sweep-train-wedding-dresses', 'no-train-wedding-dresses'
	, 'fall-wedding-dresses', 'spring-wedding-dresses', 'summer-wedding-dresses', 'winter-wedding-dresses'
	, 'bohemian-wedding-dresses', 'casual-wedding-dresses', 'chic-wedding-dresses', 'classic-wedding-dresses', 'cute-wedding-dresses', 'dramatic-wedding-dresses', 'eco-friendly-wedding-dresses', 'elegant-wedding-dresses', 'fairytale-wedding-dresses', 'formal-wedding-dresses', 'glamorous-wedding-dresses', 'grecian-wedding-dresses', 'hip-wedding-dresses', 'modern-wedding-dresses', 'modest-wedding-dresses', 'nautical-wedding-dresses', 'old-hollywood-wedding-dresses', 'romantic-wedding-dresses', 'rustic-wedding-dresses', 'simple-wedding-dresses', 'traditional-wedding-dresses', 'victorian-wedding-dresses', 'vintage-wedding-dresses'
	, 'ballroom-wedding-dresses', 'banquet-wedding-dresses', 'beach-wedding-dresses', 'city-wedding-dresses', 'city-hall-wedding-dresses', 'country-wedding-dresses', 'country-club-wedding-dresses', 'destination-wedding-dresses', 'farm-wedding-dresses', 'garden-wedding-dresses', 'outdoor-wedding-dresses', 'religious-locale-wedding-dresses', 'restaurant-wedding-dresses', 'vineyard-wedding-dresses'
	, 'aire-barcelona', 'alfred-angelo', 'alice-padrul', 'alita-graham', 'alita-graham-by-kleinfeld-bridal', 'allure-bridals', 'alma-novia', 'alvina-valneta-by-jlm-couture', 'alyne-by-rivini', 'amanda-garrett', 'amsale', 'angel-rivera', 'anjolique-bridal', 'ann-taylor', 'anne-barge', 'aria', 'augusta-jones', 'avenue-diagonal', 'bcbgmaxazria', 'berta', 'bhldn', 'birnbaum-and-bullock', 'blue-by-enzoani', 'blush-by-hayley-paige-by-jlm-couture', 'bonny-bridal', 'camille-la-vie', 'carolina-herrera', 'casablanca-bridal', 'cb-couture', 'christos', 'cristiano-lucci', 'david-tutera', 'davids-bridal', 'davinci-bridal', 'demetrios', 'dennis-basso-by-kleinfeld-bridal', 'dolly-couture', 'eddy-k', 'eden-bridals', 'elizabeth-st-john', 'essense-of-australia', 'eugenia', 'hayley-paige-by-jlm-couture', 'ian-stuart-bride', 'impression-bridal', 'ines-di-santo', 'ivy-and-aster', 'j-crew', 'james-clifford', 'jane-white', 'jasmine-collection', 'jenny-lee', 'jenny-yoo', 'jlm-couture', 'jordan-fashions', 'judd-waddell', 'justin-alexander', 'kelly-faetanini', 'kennedy-blue-bridal', 'kenneth-pool', 'kirstie-kelly', 'kitty-chen-couture', 'kleinfeld-collection', 'kleinfeld-kollection', 'l-fay', 'la-sposa', 'lazaro-by-jlm-couture', 'lea-ann-belter-bridal', 'lela-rose', 'liancarlo', 'lis-simon', 'liz-fields', 'lunanovias', 'madeline-gardner', 'maggie-sottero', 'mark-zunino-by-kleinfeld-bridal', 'martin-mccrea', 'marys-bridal', 'matthew-christopher', 'mikaella', 'modeca', 'monique-lhuillier', 'moonlight-bridal', 'nicole-miller', 'nordstrom', 'olia-zavozina', 'oscar-de-la-renta', 'paloma-blanca', 'pnina-torni-by-kleinfeld-bridal', 'private-label-by-g', 'pronovias', 'rania-hatoum', 'reem-acra', 'rita-vinieris', 'robert-bullock', 'romona-keveza', 'romona-keveza', 'rosa-clara', 'roz-la-kelin', 'saison-blanche-couture', 'san-patrick', 'sarah-janks-bridal', 'sassi-holford', 'simone-carvalli', 'simplybridal', 'sincerity-bridal', 'siri-bridal', 'sj-couture', 'sophia-tolli', 'st-pucchi', 'stephen-yearick', 'steven-birnbaum', 'tara-keely-by-jlm-couture', 'ti-adora-by-alvina-valenta-by-jlm-couture', 'tony-bowls', 'val-stefani', 'valentini-spose', 'venus-bridal', 'vera-wang', 'veronica-sheaffer', 'victor-harper', 'victoria-nicole', 'vwidon', 'watters-brides', 'white-one', 'winnie-couture', 'ysa-makino', 'yumi-katsura'
	];

var tagsPage = ['Beading', 'Bow', 'Bubble Hem', 'Buttons', 'Cascading Drape', 'Corset', 'Embroidery', 'Feathers', 'Flowers', 'Jacket', 'Peplum', 'Pick Ups', 'Pleating', 'Rhinestones', 'Ruching', 'Ruffles', 'Sash', 'Tiers', 'Waistband', 'Zipper'
	, 'White', 'Ivory', 'Black', 'Blue', 'Blush', 'Brown', 'Burgundy', 'Champagne', 'Coral', 'Gold', 'Gray', 'Green', 'Lavender', 'Olive', 'Orange', 'Pink', 'Purple', 'Red', 'Silver', 'Yellow'
	, 'Charmeuse', 'Chiffon', 'Cotton', 'Lace', 'Linen', 'Organza', 'Satin', 'Silk', 'Taffeta', 'Tulle', 'Velvet', 'Wool'
	, 'Asymmetrical Neckline', 'Backless', 'Bateau', 'Cowl', 'Halter', 'High Neck', 'Illusion', 'Off The Shoulder', 'One Shoulder', 'Scoop', 'Square', 'Strapless', 'Sweetheart', 'V-Neck'
	, 'A-Line', 'Ball Gown', 'Column', 'Empire', 'Fit N Flare', 'Mermaid', 'Princess', 'Sheath', 'Trumpet'
	, 'Asymmetrical Sleeve', 'Cap Sleeve', 'Half Sleeve', 'Long Sleeve', 'Short Sleeve', 'Sleeveless', 'Spaghetti Straps'
	, 'Asymmetrical Train', 'Brush', 'Cathedral', 'Chapel', 'Court', 'Sweep', 'No Train'
	, 'Fall', 'Spring', 'Summer', 'Winter'
	, 'Bohemian', 'Casual', 'Chic', 'Classic', 'Cute', 'Dramatic', 'Eco Friendly', 'Elegant', 'Fairytale', 'Formal', 'Glamorous', 'Grecian', 'Hip', 'Modern', 'Modest', 'Nautical', 'Old Hollywood', 'Romantic', 'Rustic', 'Simple', 'Traditional', 'Victorian', 'Vintage'
	, 'Ballroom', 'Banquet', 'Beach', 'City', 'City Hall', 'Country', 'Country Club', 'Destination', 'Farm', 'Garden', 'Outdoor', 'Religious Locale', 'Restaurant', 'Vineyard'
	, 'aire-barcelona', 'alfred-angelo', 'alice-padrul', 'alita-graham', 'alita-graham-by-kleinfeld-bridal', 'allure-bridals', 'alma-novia', 'alvina-valneta-by-jlm-couture', 'alyne-by-rivini', 'amanda-garrett', 'amsale', 'angel-rivera', 'anjolique-bridal', 'ann-taylor', 'anne-barge', 'aria', 'augusta-jones', 'avenue-diagonal', 'bcbgmaxazria', 'berta', 'bhldn', 'birnbaum-and-bullock', 'blue-by-enzoani', 'blush-by-hayley-paige-by-jlm-couture', 'bonny-bridal', 'camille-la-vie', 'carolina-herrera', 'casablanca-bridal', 'cb-couture', 'christos', 'cristiano-lucci', 'david-tutera', 'davids-bridal', 'davinci-bridal', 'demetrios', 'dennis-basso-by-kleinfeld-bridal', 'dolly-couture', 'eddy-k', 'eden-bridals', 'elizabeth-st-john', 'essense-of-australia', 'eugenia', 'hayley-paige-by-jlm-couture', 'ian-stuart-bride', 'impression-bridal', 'ines-di-santo', 'ivy-and-aster', 'j-crew', 'james-clifford', 'jane-white', 'jasmine-collection', 'jenny-lee', 'jenny-yoo', 'jlm-couture', 'jordan-fashions', 'judd-waddell', 'justin-alexander', 'kelly-faetanini', 'kennedy-blue-bridal', 'kenneth-pool', 'kirstie-kelly', 'kitty-chen-couture', 'kleinfeld-collection', 'kleinfeld-kollection', 'l-fay', 'la-sposa', 'lazaro-by-jlm-couture', 'lea-ann-belter-bridal', 'lela-rose', 'liancarlo', 'lis-simon', 'liz-fields', 'lunanovias', 'madeline-gardner', 'maggie-sottero', 'mark-zunino-by-kleinfeld-bridal', 'martin-mccrea', 'marys-bridal', 'matthew-christopher', 'mikaella', 'modeca', 'monique-lhuillier', 'moonlight-bridal', 'nicole-miller', 'nordstrom', 'olia-zavozina', 'oscar-de-la-renta', 'paloma-blanca', 'pnina-torni-by-kleinfeld-bridal', 'private-label-by-g', 'pronovias', 'rania-hatoum', 'reem-acra', 'rita-vinieris', 'robert-bullock', 'romona-keveza', 'romona-keveza', 'rosa-clara', 'roz-la-kelin', 'saison-blanche-couture', 'san-patrick', 'sarah-janks-bridal', 'sassi-holford', 'simone-carvalli', 'simplybridal', 'sincerity-bridal', 'siri-bridal', 'sj-couture', 'sophia-tolli', 'st-pucchi', 'stephen-yearick', 'steven-birnbaum', 'tara-keely-by-jlm-couture', 'ti-adora-by-alvina-valenta-by-jlm-couture', 'tony-bowls', 'val-stefani', 'valentini-spose', 'venus-bridal', 'vera-wang', 'veronica-sheaffer', 'victor-harper', 'victoria-nicole', 'vwidon', 'watters-brides', 'white-one', 'winnie-couture', 'ysa-makino', 'yumi-katsura'
];

/**
 * @function name:	setCheckboxDefaultValue()
 * @description:	This function sets default value of a checkbox as clicked
 *					 if its element ID is a search keyword shown in URL.
 * @related issues:	WD-099, WD-026
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			06/25/2014
 * @last modified: 	11/11/2014
 * @called by:		function initCustomForms()
 *					 in sail/assets/js/jquery.main.js
 */
function setCheckboxDefaultValue()
{
	/*
	console.log('window.location.href = ' + window.location.href);
	// window.location.href = http://localhost/?backless-wedding-dresses=on&cathedral-train-wedding-dresses=on
	console.log('window.location.pathname = ' + window.location.pathname);
	// window.location.pathname = /
	console.log('window.location.search = ' + window.location.search);
	// window.location.search = ?backless-wedding-dresses=on&cathedral-train-wedding-dresses=on
	*/
	var tag = '';
	var tags = getTagsFromSearchUrl();
	for (var i in tags) {
		tag = tags[i];
		//console.log('tag =', tag);
		document.getElementById(tag).checked = true;
		if (document.getElementById(tag + '1')) {
			document.getElementById(tag + '1').checked = true;
		}
	}
	//document.getElementById('menu-toggle').checked = true;
}


/**
 * @function name:	getTagsFromSearchUrl()
 * @description:	This function gets tags from search URL (i.e., window.location.search).
 * @related issues:	WD-099
 * @param:			void
 * @return:			array tags
 * @author:			Don Hsieh
 * @since:			11/11/2014
 * @last modified: 	11/11/2014
 * @called by:		function setCheckboxDefaultValue()
 *					 in sail/assets/js/wd.js
 *					function initCheckedCategories()
 *					 in sail/assets/js/jquery.main.js
 */
function getTagsFromSearchUrl()
{
	var tags = [];
	if (window.location.search) {
		var search = window.location.search.split('?')[1];
		var arr = [];
		if (search.length) {
			if (search.indexOf('&') > -1) arr = search.split('&');
			else arr = [search];
			//console.log('arr =', arr);
			if (arr.length) {
				var tag = '';
				for (var i in arr) {
					tag = arr[i].split('=on')[0];
					if (tagsUrl.indexOf(tag) > -1) {	// validate tag
						tags.push(tag);
					}
				}
			}
		}
	}
	return tags;
}


/**
 * @function name:	setSearchTags()
 * @description:	This function sets search URL by IDs of checked checkboxes.
 * @related issues:	WD-112, WD-099
 * @param:			void
 * @return:			void
 * @author:			Don Hsieh
 * @since:			11/10/2014
 * @last modified: 	01/19/2015
 * @called by:		input(type="submit" value="SEARCH DRESSES" class="nav-opener" onclick="setSearchTags()")
 *					li: input(type="submit" value="SEARCH DRESSES" onclick="setSearchTags()")
 *					 in sail/views/layout.jade
 */
function setSearchTags()
{
	// console.log('function setSearchTags()');
	var tags = [];
	var tag = '';
	var inputElements = document.getElementsByClassName('chkbx-elem');
	for (var i = 0; inputElements[i]; ++i) {
		if (inputElements[i].checked) {
			tag = inputElements[i].id;
			if (tag.slice(-1) !== '1' && tags.indexOf(tag) == -1) {
				tags.push(tag + '=on');
				//tags.push(tag);
			}
		}
	}
	if (tags.length) {
		if (tags.length > 1) tags.sort();
		// console.log('tags =', tags);

		var searchOld = window.location.search.replace('?', '');
		// console.log('searchOld = ' + searchOld);
		if (searchOld !== tags.join('&')) {
			if (tags.length < 1) window.location.href = '/';
			else window.location.href = '/?' + tags.join('&');
		}
	}
}

/**
 * @function name:	setSearchTags()
 * @description:	This function gets search keywords by URL.
 * @related issues:	WD-112
 * @param:			object $routeParams
 * @return:			array keywords
 * @author:			Don Hsieh
 * @since:			01/14/2015
 * @last modified: 	01/14/2015
 * @called by:		function wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, limit)
 *					 in php/public/js/app.js
 */
function getSearchKeywordsByUrl($routeParams)
{
	// console.log('function getSearchKeywordsByUrl($routeParams)');
	// console.log('$routeParams =', $routeParams);
	// var keywords = Object.keys($routeParams);
	
	var keywords = [];
	for (var i in $routeParams) {
		// console.log('$routeParams[i] =', $routeParams[i]);
		if ($routeParams[i] === 'on') keywords.push(i);
	}
	// console.log('keywords =', keywords);
	return keywords;
}


/**
 * @function name:	getMilliSec()
 * @description:	This function gets current timestamp in milli seconds.
 * @related issues:	WD-112
 * @param:			void
 * @return:			float milli seconds
 * @author:			Don Hsieh
 * @since:			01/27/2015
 * @last modified: 	01/27/2015
 * @called by:		function wdScroll(url, $http, $compile, $scope, $routeParams, sessionStorage, limit)
 *					 in php/public/js/app.js
 */
function getMilliSec()
{
	return new Date().getTime();
}