angular.module('miapp', ['ngRoute','ngCookies'])
    .factory('httpInterceptor', [ '$q', '$injector','$location',function($q, $injector,$location) {
        var httpInterceptor = {
            'responseError' : function(response) {
              if(response.status === 670){
                 //服务器知道你没登陆，赶紧去登陆吧
                //  console.log('not login');

                 $location.path('/login');
               }
            },
            'response' : function(response) {
              return response;
            },
            'request' : function(config) {
             return config;
            },
            'requestError' : function(config){
              return $q.reject(config);
            }
          }
        return httpInterceptor;
    }])
    .config(function($routeProvider,$httpProvider) {
        //拦截器配置
        $httpProvider.interceptors.push('httpInterceptor');

        //解决$http里面后台拿不到数据的问题
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      	// Override $http service's default transformRequest
      	$httpProvider.defaults.transformRequest = [function(data) {
      		/**
      		 * The workhorse; converts an object to x-www-form-urlencoded serialization.
      		 * @param {Object} obj
      		 * @return {String}
      		 */
      		var param = function(obj) {
      			var query = '';
      			var name, value, fullSubName, subName, subValue, innerObj, i;

      			for (name in obj) {
      				value = obj[name];

      				if (value instanceof Array) {
      					for (i = 0; i < value.length; ++i) {
      						subValue = value[i];
      						fullSubName = name + '[' + i + ']';
      						innerObj = {};
      						innerObj[fullSubName] = subValue;
      						query += param(innerObj) + '&';
      					}
      				} else if (value instanceof Object) {
      					for (subName in value) {
      						subValue = value[subName];
      						fullSubName = name + '[' + subName + ']';
      						innerObj = {};
      						innerObj[fullSubName] = subValue;
      						query += param(innerObj) + '&';
      					}
      				} else if (value !== undefined && value !== null) {
      					query += encodeURIComponent(name) + '='
      							+ encodeURIComponent(value) + '&';
      				}
      			}

      			return query.length ? query.substr(0, query.length - 1) : query;
      		};

      		return angular.isObject(data) && String(data) !== '[object File]'
      				? param(data)
      				: data;
      	}];

        //路由配置
        $routeProvider
				.when('/', {
						controller: 'homeCtrl',//这里设定了controller就不需要在home.html里面设置ng-controller了。
						templateUrl: '/view/home.html'
				})
				.when('/button', {
						controller: 'buttonCtrl',
						templateUrl: '/view/button.html'
				})
				.when('/cell', {
						controller: 'cellCtrl',
						templateUrl: '/view/cell.html'
				})
				.when('/toast', {
						controller: 'toastCtrl',
						templateUrl: '/view/toast.html'
				})
				.when('/dialog', {
						controller: 'dialogCtrl',
						templateUrl: '/view/dialog.html'
				})
				.when('/progress', {
						controller: 'progressCtrl',
						templateUrl: '/view/progress.html'
				})
				.when('/msg', {
						controller: 'msgCtrl',
						templateUrl: '/view/msg.html'
				})
				.when('/article', {
						controller: 'articleCtrl',
						templateUrl: '/view/article.html'
				})
				.when('/actionsheet', {
						controller: 'actionsheetCtrl',
						templateUrl: '/view/actionsheet.html'
				})
				.when('/icons', {
						controller: 'iconsCtrl',
						templateUrl: '/view/icons.html'
				})
				.when('/panel', {
						controller: 'panelCtrl',
						templateUrl: '/view/panel.html'
				})
				.when('/tab', {
						controller: 'tabCtrl',
						templateUrl: '/view/tab.html'
				})
				.when('/navbar', {
						controller: 'navbarCtrl',
						templateUrl: '/view/navbar.html'
				})
				.when('/tabbar', {
						controller: 'tabbarCtrl',
						templateUrl: '/view/tabbar.html'
				})
				.when('/searchbar', {
						controller: 'searchbarCtrl',
						templateUrl: '/view/searchbar.html'
				})
				//diy
				.when('/word', {
						controller: 'wordCtrl',
						templateUrl: '/view/word.html'
				})
				.when('/getCode', {
						controller: 'getCodeCtrl',
						templateUrl: '/view/getCode.html'
				})
				.when('/case', {
						controller: 'caseCtrl',
						templateUrl: '/view/case.html'
				})
				.when('/detail', {
						controller: 'detailCtrl',
						templateUrl: '/view/detail.html'
				})
				.when('/user', {
						controller: 'userCtrl',
						templateUrl: '/view/user.html'
				})
				.when('/login', {
						controller: 'loginCtrl',
						templateUrl: '/view/login.html'
				})
				.when('/register', {
						controller: 'registerCtrl',
						templateUrl: '/view/register.html'
				})
				.otherwise({
						redirectTo: '/'
				})

    })
    .factory('orderStr', function() {
        return {
            cutstr: function(str) {
              var  str = str.replace(/[\r\n]/g,"");
              var teamA=str.indexOf('(A)'),
                  teamB=str.indexOf('(B)'),
                  teamC=str.indexOf('(C)'),
                  teamD=str.indexOf('(D)');
              var que=str.slice(0,teamA);
              var strA=str.slice(teamA,teamB);
              var strB=str.slice(teamB,teamC);
              var strC=str.slice(teamC,teamD);
              var strD=str.slice(teamD);

              return objstr={
                      question: que,
                      strA:strA,
                      strB:strB,
                      strC:strC,
                      strD:strD
                    };
            }
        };
    })
    .factory('UsrService',function($http,$cookieStore) {

      // var Usr = localStorage.getItem('usr');//记录用户名的,全局可用 -1代表未登陆，一般不会出现
      return {

        getCurrentUser: function() {
          return Usr;
        },
          setCurrentUser: function(user) {
            Usr = user;
        },
        getUserInfo: function() {
          var Usr = localStorage.getItem('usr');if(!Usr){ location.href='#/login' };
           return $http.post('http://mi.jx2012.cn/api/index.php/index/index/getUserInfo',{usr:Usr});
        },
        changeScount:function(scount){
          var Usr = localStorage.getItem('usr');if(!Usr){ location.href='#/login' };
          return $http.post('http://mi.jx2012.cn/api/index.php/index/user/changeScount',{usr:Usr,scount:scount});
        },
        help:function(caseId,scount){
          var Usr = localStorage.getItem('usr');if(!Usr){ location.href='#/login' };
          return $http.post('http://mi.jx2012.cn/api/index.php/index/user/help',{usr:Usr,scount:scount,caseId:caseId});
        }

      };

    })

    .directive('compile', function($compile) {

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
    })
    //首页控制器
    .controller('homeCtrl', ['$scope','$cookieStore',homeCtrl])
    //增加toast控件控制器
    .controller('toastCtrl', ['$scope', '$interval', toastCtrl])
    //增加dialog控件控制器
    .controller('dialogCtrl', ['$scope', dialogCtrl])
    //增加progress控件控制器
    .controller('progressCtrl', ['$scope', progressCtrl])
    //增加actionsheet控件控制器
    .controller('actionsheetCtrl', ['$scope', actionsheetCtrl])
    //增加searchbar控件控制器
    .controller('searchbarCtrl', ['$scope', searchbarCtrl])
    .controller('wordCtrl', ['$scope','$http','$timeout','$routeParams','orderStr','UsrService',wordCtrl])
    .controller('userCtrl',['$scope','UsrService',userCtrl])
    .controller('caseCtrl', ['$scope','$http','$routeParams',caseCtrl])
    .controller('detailCtrl', ['$scope','$http','$routeParams','$location','UsrService',detailCtrl])
    .controller('getCodeCtrl',['$scope','$routeParams',getCodeCtrl])
    .controller('loginCtrl',['$scope','$cookieStore','$http','UsrService',loginCtrl])
    .controller('registerCtrl',['$scope','$http','$routeParams',registerCtrl]);
