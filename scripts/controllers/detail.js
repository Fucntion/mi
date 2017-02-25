function detailCtrl($scope,$http,$routeParams,$location,UsrService){

  $scope.caseId = null;
  $scope.$watch('$viewContentLoaded', function() {
      $scope.caseId = $location.search().id;
      // console.log(caseId);
      if(!$scope.caseId && $scope.caseId!==0) return;//文章会有id为0的。。。。。，后端的坑
      $scope.detail.onload($scope.caseId);
  });

  $scope.user={};
  $scope.refresh = function(){
    UsrService.getUserInfo().success(function(result,header,config,status){
        var usrInfo = result.data;
        console.log(usrInfo.scount);
        $scope.user.scount  = usrInfo.scount;

    })


    $http({url:'http://mi.jx2012.cn/api/index.php/index/index/getCaseSign?id='+$scope.caseId,method:'GET'}).success(function(result,header,config,status){
      //响应成功
      console.log(result.data);
      $scope.detail.total = result.data.total;
      $scope.detail.aim = result.data.aim;

      if($scope.detail.total/$scope.detail.aim*100>0){
        $scope.progressShow = true;
      }else{
        $scope.progressShow = false;
      }

    })

  }

  $scope.detail = {
    title:'',
    content:'',
    onload:function(id){

      $scope.loadingToastHide = true;
      $http({url:'http://mi.jx2012.cn/api/index.php/index/index/getCaseSign?id='+id,method:'GET'}).success(function(result,header,config,status){
        //响应成功
        console.log(result.data);
        $scope.loadingToastHide = false;
        $scope.detail.title = result.data.title;
        $scope.detail.content = result.data.content;

        $scope.detail.total = result.data.total;
        $scope.detail.aim = result.data.aim;
        console.log($scope.detail.total,$scope.detail.aim);
        if($scope.detail.total/$scope.detail.aim*100>0){
          $scope.progressShow = true;
        }else{
          $scope.progressShow = false;
        }
        $scope.refresh();





      }).error(function(result,header,config,status){
            //处理响应失败
            $scope.loadingToastHide = false;
            // $scope.toast.hide = false;
            // $scope.toast.result = false;
            // $scope.toast.msg = '题目拉取失败，刷新下吧';
            // $timeout(function(){ $scope.toast.hide = true; },2000);

      });
    }
  }


  $scope.help ={
    number:null,
    helpShow:false,
    submit:function(){
      //切换表单显示状态
      
      //如果是空的情况下,则不提交
      if(!$scope.help.number){
        
        if($scope.help.helpShow == true){
          alert('请输入积分');
          return;
        }
        $scope.help.helpShow = true;
        return;
      }else{
        $scope.help.helpShow = false;
      }
      UsrService.help($scope.caseId,-parseInt($scope.help.number)).success(function(result,header,config,status){
        $scope.detail.total = result.data.total;
        $scope.refresh();


      })

    }
  }


}
