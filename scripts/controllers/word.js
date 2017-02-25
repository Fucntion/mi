function wordCtrl($scope,$http,$timeout,$routeParams,orderStr,UsrService) {

  $scope.$watch('$viewContentLoaded', function() {
      $scope.content.onload();
  });


  $scope.user = {
      success:0,
      error:0,
      total:0,
  }

  $scope.usr = function(){
    UsrService.getUserInfo().success(function(result,header,config,status){
        var usrInfo = result.data;
        $scope.user.name  = usrInfo.usr;
        $scope.user.scount  = usrInfo.scount;
    })
  }


  $scope.content = {
    question:'#',
    answer:'',
    entities:[
        {
          key: 'A',
          value:'#',
          checked:'false',
          status:null
        }, {
          key: 'B',
          value:'#',
          checked:'false',
          status:null
        }, {
          key: 'C',
          value:'#',
          checked:'false',
          status:null
        }, {
          key: 'D',
          value:'#',
          checked:'false',
          status:null
        }
      ],
    //前台选择后的一个交互事件（函数）
    updateSelection : function(position, entities) {
      angular.forEach(entities, function(subscription, index) {
        if (position != index){
          subscription.checked = false;
        }else{

          subscription.checked = true;
          $scope.content.submitBtn.Disabled=false;//有选项选中后激活提交按钮

        }

      });
    },
    onload:function(){

      //初始化一次性向服务器请求二十个题目
      $scope.loadingToastHide = true;
      $http({url:'http://mi.jx2012.cn/api/index.php/index/index/getQuestion',method:'GET'}).success(function(result,header,config,status){
        //响应成功
        console.log(result.data[0]);
        $scope.loadingToastHide = false;

        if(angular.isObject(result.data[0]) && result.stausCode==100){

          var word = result.data[0];
          var row=orderStr.cutstr(word.questions);//自建服务
          $scope.content.question = row.question;//问题
          $scope.content.answer = word.answer;//答案
          //绑定各个选项
          angular.forEach($scope.content.entities, function(item,index) {

                switch (item.key) {
                  case 'A':item.value = row.strA
                  break;
                  case 'B':item.value = row.strB
                  break;
                  case 'C':item.value = row.strC
                  break;
                  case 'D':item.value = row.strD
                  break;
                  default:
                  break;
                }
          });
          $scope.user.total++;//总题目数+1

        }else{
          $scope.loadingToastHide = false;
          $scope.toast.hide = false;
          $scope.toast.result = false;
          $scope.toast.msg = '题目在半路走丢了';//虽然数据请求到了但是前端没有拿到的情况
          $timeout(function(){ $scope.toast.hide = true; },2000);
        }
          //刷新积分
          $scope.usr();

      }).error(function(result,header,config,status){
            //处理响应失败
            $scope.loadingToastHide = false;
            $scope.toast.hide = false;
            $scope.toast.result = false;
            $scope.toast.msg = '题目拉取失败，刷新下吧';
            $timeout(function(){ $scope.toast.hide = true; },2000);

      });
    }
    //预备，本来是想onload一次拿20条数据，然后每次用完就从本地拿数据。过二十次再从服务器获取一次的，不过太麻烦初期不做
    // ,change:function(){
    //   //切换题目
    //   $scope.loadingToastHide = true;
    //   $scope.content.onload();
    //   $scope.loadingToastHide = true;
    //
    // }
    ,submitBtn:{
      //提交
      Disabled:true,
      html:'提交',
      submit:function() {

        // console.log(this);
        if(this.Disabled) return;//一定要选择选项才可以点击
        $scope.loadingToastHide = true;//数据储存在本地以至于loading一个圈都转不完。。。。
        angular.forEach($scope.content.entities, function(subscription, index) {
            // console.log(subscription);
            //只对选择的按钮进行比对

            if(subscription.checked==true){
              $scope.loadingToastHide = false;
              if(subscription.key == $scope.content.answer){

                $scope.toast.result = true;
                $scope.toast.msg = '厉害了你';
                $scope.toast.hide = false;
                $scope.user.success++;//对题目数+1

              }else{
                $scope.toast.result = false;
                $scope.toast.msg = '答错了，加油哦';
                $scope.toast.hide = false;
                $scope.user.error++;//错题数+1
              }


            }
            subscription.checked = false;//去掉选中的选项状态


        })
          this.Disabled = true;//禁用按钮
        // console.log($scope.toast);
        if($scope.toast.result){//正确就更新分数咯
          UsrService.changeScount(1).success(function(result,header,config,status){

            $timeout(function(){ $scope.toast.hide = true;$scope.content.onload(); },2000);

          })
        }else{
          $timeout(function(){ $scope.toast.hide = true;$scope.content.onload(); },2000);

        }


      }


    }
  }


  $scope.loadingToastHide = false;


// 延迟下拉菜单:
//  鼠标放到button上的时候,延迟500毫秒显示下拉菜单,
// 当鼠标离开button的时候,延迟500毫秒隐藏下拉菜单,
// 如果鼠标是进入了下拉菜单部分,那么就不隐藏下拉菜单
// 如果鼠标离开了下拉菜单,延迟500毫秒隐藏下拉菜单,
// 如果鼠标是进入了button,那么还是不隐藏下拉菜单


  $scope.setStatus = function(status){

    switch (status) {
      case false:return null
      break;
      case true:return 'active'
      break;
      default: return null
      break;

    }
  }



  //这里写的是答题的对错情况弹出提示框
  $scope.toast = {
    hide : true,
    result: true,//对的话就这样 EA0D  \EA06
    msg : null//如果是对的就提示“你答对了”，反之则"错误"
  }




}
