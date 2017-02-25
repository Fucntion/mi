function userCtrl($scope,UsrService) {

  $scope.user ={};
  UsrService.getUserInfo().success(function(result,header,config,status){
      var usrInfo = result.data;
      $scope.user.name  = usrInfo.usr;
      $scope.user.scount  = usrInfo.scount;
  })

}
