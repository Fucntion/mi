function caseCtrl($scope,$http,$routeParams){

  $scope.$watch('$viewContentLoaded', function() {
      $scope.content.onload();
  });


  $scope.content = {
    innerHTML:{ },
    go:function(caseObj){
      // console.log(id);return;
      location.href = '#/detail/?id='+caseObj.id;
    },
    onload:function(){

      $scope.loadingToastHide = true;

      $http({url:'http://mi.jx2012.cn/api/index.php/index/index/getCaseList',method:'GET'}).success(function(result,header,config,status){
        //响应成功
        console.log(result.data);
        if(result.stausCode!==100){$scope.loadingToastHide = true;return;}
        $scope.content.innerHTML = result.data;
        $scope.loadingToastHide = false;


      }).error(function(result,header,config,status){
            //处理响应失败
            $scope.loadingToastHide = false;

      });
    }

  }






}
