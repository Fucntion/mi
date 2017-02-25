fis.match('{less/**,bower_components/**}', {
    release: false
});

fis.match('{less/app.less,bower_components/**/*.min.js,bower_components/**/*.min.js.map}',{
  release:true
})



fis.config.set('modules.postpackager', 'simple');

fis.config.set('pack', {
    'lib.js': [
        'angular.min.js',
        'angular-animate.min.js',
        'angular-cookies.min.js',
        'angular-route.min.js'
    ],
    'app.js': [
        'scripts/**/*.js'
    ]
});

fis.match('app.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});
// fis.media('dev').match("{app.less,**.html,lib.js,app.js,/images/**,}", {
//   deploy: fis.plugin('local-deliver', {
//       to: './output'
//   })
// })


fis.media('qa').match('*', {
  deploy: fis.plugin('http-push', {
    receiver: 'http://mi.jx2012.cn/receiver.php',
    to: '.' // 注意这个是指的是测试机器的路径，而非本地机器
  })
});
