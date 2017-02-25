function getCodeCtrl($scope,$routeParams,$location){


  $scope.$watch('$viewContentLoaded', function() {

    console.log($location.path());
    //看是否登陆过
    // if($cookieStore.get('loginStatus')){
    //
    //
    // }else{
    //
    //   var APPID = 'wx346375eb0ca80919',
    //       APPSECRET = 'a7e2c7fb4c8d88232c60f9bf232cf9e7',
    //       REDIRECT_URI = 'http://mi.jx2012.cn/#/getCode',
    //       URL = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+APPID+'&redirect_uri='+REDIRECT_URI+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
    //       location.href = URL;
    //
    // }

  });

}
