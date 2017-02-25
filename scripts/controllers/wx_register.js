function loginCtrl($scope,$cookieStore,$http,UsrService){
//   //     // 拿到Url参数
// function getUrlParam(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//     var r = window.location.search.substr(1).match(reg); //匹配目标参数
//     if (r != null) return unescape(r[2]);
//     return null; //返回参数值
// }
// // // 微信登录
// if ($cookieStore.get('islogin') == undefined || $cookieStore.get('islogin') == '') {
//   location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri=http%3a%2f%2fplan.icloudinn.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
//   $cookieStore.put('islogin', 1)
// }
// if ($cookieStore.get('islogin') == 1) {
// var code = getUrlParam('code')
// console.log('code=' + code)
// if (code == null) {
//     location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4a150a2811c36060&redirect_uri=http%3a%2f%2fplan.icloudinn.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
// } else {
//     var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx4a150a2811c36060&secret=9ead653f73e65552b7676649aa70879a&code=" + code + "&grant_type=authorization_code";
//     console.log(url);
//     $http({
//         url: 'http://plan.icloudinn.com/zoule/index.php/Home/login/getUserInfo',
//         method: 'GET',
//         params: {
//             'code': code,
//             'state': 'STATE'
//         }
//     }).success(function(data, header, config, status) {
//         console.log('success');
//         myFactory.userinfo = data.data
//         console.log(data);
//         // 用户头像
//         $rootScope.userimg = myFactory.userinfo.headimgurl
//             // 用户昵称
//         $rootScope.username = myFactory.userinfo.nickname
//     }).error(function(data, header, config, status) {
//         console.log('error');
//         console.log(data);
//     })
// }
// }

  $scope.usr = '';
  $scope.pwd = '';
  $scope.submitBtn = {
    //提交
      Disabled:true,
      html:'请输入账户和密码',
      submit:function() {

        if(this.Disabled==true){console.log('按钮被禁用');return};

        $scope.loadingToastHide = true;
        $http.post('http://mi.jx2012.cn/api/index.php/index/user/login',{usr:$scope.usr,pwd:$scope.pwd}).success(function(result,header,config,status){

          $scope.loadingToastHide = false;
          if(result.stausCode ==203){
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
            // $cookieStore.put('usr',result.data.usr,{'expires': expireDate});
            localStorage.setItem('usr',result.data.usr);
            location.hash ='#/home';

          }
        })

      }
  }
  //如果usr、pwd的值同时不为空则可以提交
  $scope.updateSelection = function() {

    if($scope.usr.length>2 && $scope.pwd.length>4){
      $scope.submitBtn.Disabled=false;//有选项选中后激活提交按钮
      $scope.submitBtn.html = '点击登陆';
    }

  }

  $scope.wx_login =function(){
    if(typeof(localStorage.openid)!='undefined' &&localStorage.getItem('openid')!=''){

      // 已经有openid,即已经登陆过了
      $http.post('http://mi.jx2012.cn/api/index.php/index/user/wx_login',{openid:localStorage.getItem('openid')}).success(function(result,header,config,status){
        //响应成功
        

      }).error(function(result,header,config,status){
            //处理响应失败
           

      });

    }else{
        // 跳去注册
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c5d202b6c5c830f&redirect_uri='+encodeURIComponent('http://mi.jx2012.cn/api/index.php/index/user/wx_register')+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    
  }

  }
  

}
