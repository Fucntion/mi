<?php

// $APPID = 'wx346375eb0ca280919';						//AppID(应用ID)
// $APPSECRET = 'a7e2c7fb4c8d88232c2260f9bf232cf9e7';	//AppSecret(应用密钥)

$code = $_GET['code'];//获取code
$weixin =  file_get_contents("https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$APPID."&secret=".$APPSECRET."&code=".$code."&grant_type=authorization_code");//通过code换取网页授权access_token
$jsondecode = json_decode($weixin); //对JSON格式的字符串进行编码
$array = get_object_vars($jsondecode);//转换成数组
$openid = $array['openid'];//输出openid
setcookie('openid',$openid,time()+3600*24*30);

header("location:index.php");
