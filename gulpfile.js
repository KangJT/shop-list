var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var data = require('./src/data/data.json');

gulp.task('devsass', function() {
    return gulp.src('./src/scss/*.{sass,scss}')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.{sass,scss}', gulp.series('devsass'));
});
//起服务器
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8081,
            host: "localhost",
            livereload: true, //监听变化自动刷新
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                console.log(pathname);
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                };
                if (pathname === '/api/index.swiper') { //接口
                    res.end(JSON.stringify(data));
                } else { //静态文件
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));;
                }
            }
        }))
});
gulp.task('dev', gulp.series('devsass', 'server', 'watch'));