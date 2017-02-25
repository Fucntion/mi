function registerCtrl($scope,$http,$location){

   $http.post('http://mi.jx2012.cn/api/index.php/index/user/wx_login',{openid:localStorage.getItem('openid')}).success(function(result,header,config,status){
        //响应成功
        

    }).error(function(result,header,config,status){
          //处理响应失败
          

    });

  console.log($scope);
  $scope.usr = '';
  $scope.pwd = ''
  $scope.submitBtn = {
    //提交
      Disabled:true,
      html:'按要求填账户和密码',
      submit:function() {
        if(this.Disabled==true){console.log('按钮被禁用');return};
        $scope.loadingToastHide = true;
        $http.post('http://mi.jx2012.cn/api/index.php/index/user/register',{usr:$scope.usr,pwd:$scope.pwd}).success(function(result,header,config,status){
          console.log(result);
          $scope.loadingToastHide = false;
          if(result.stausCode ==200){

            location.hash ='#/login';

          }
        })

        // $http({url:'http://mi.jx2012.cn/api/index.php/index/user/register',method:'POST',data:{usr:$scope.usr,pwd:$scope.pwd}}).success(function(result,header,config,status){
        //   console.log(result);
        // })

      }
  }
  //如果usr、pwd的值同时不为空则可以提交
  $scope.updateSelection = function() {
    // console.log($scope.pwd.length,$scope.usr.length);
    if($scope.usr.length>2 && $scope.pwd.length>4){
      $scope.submitBtn.Disabled=false;//有选项选中后激活提交按钮
      $scope.submitBtn.html = '赶紧点我注册';
    }

  }

}
