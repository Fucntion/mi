function loginCtrl($scope,$cookieStore,$http,UsrService){


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
        // http://mi.jx2012.cn/api/index.php/index/user/wx_register
      location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c5d202b6c5c830f&redirect_uri='+encodeURIComponent('http://mi.jx2012.cn/#/register')+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    
  }

  }
  

}
