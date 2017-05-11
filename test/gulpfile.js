var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    image = require("gulp-image"),
    del = require('del'),
    less = require('gulp-less');
var browserSync = require('browser-sync').create();
//压缩css,压缩后的文件放入dest/css
gulp.task('minifycss', function() {
    return gulp.src('css/*.css')
               .pipe(cssnano()) //压缩
               .pipe(gulp.dest('dest/css'));//输出
});
//合并并压缩css，合并压缩后的文件放入dest/css
gulp.task('concatminifycss', function() {
    return gulp.src('css/*.css')
                .pipe(concat('main.css'))    //合并所有css到main.css
                //.pipe(gulp.dest('dest/css'))    //输出main.css到文件夹
                //.pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
                .pipe(cssnano())//压缩
                .pipe(gulp.dest('dest/css'));//输出
});

//压缩js，压缩后的文件放入dest/js
gulp.task('minifyjs', function() {
    return gulp.src('js/*.js')
                .pipe(uglify())//压缩
                .pipe(gulp.dest('dest/js'));//输出
});

//合并并压缩js，合并压缩后的文件放入dest/js
gulp.task('concatminifyjs', function() {
    return gulp.src('js/*.js')
                .pipe(concat('main.js'))    //合并所有js到main.js
                .pipe(gulp.dest('dest/js'))    //输出main.js到文件夹
                .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
                .pipe(uglify())//压缩
                .pipe(gulp.dest('dest/js'));//输出
});

//压缩图片，压缩后的文件放入dest/images
gulp.task('image',function(){
    gulp.src('images/*.+(jpg|png|gif|svg)')
        .pipe(image())//压缩
        .pipe(gulp.dest('dest/images'));//输出
});

//执行压缩前，先删除dest文件夹里的内容
gulp.task('clean', function(cb) {
    del(['dest/*'], cb)
});

//编译less到css
gulp.task("less",function(){
    gulp.src('css/*.less')
        .pipe(less())
        .pipe(gulp.dest("dest/css"));

});
//监视文件的变化
gulp.task("watch",function(){
gulp.watch("css/*.less",['less']);

});

//默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', function() {
    // 将你的默认的任务代码放在这
    gulp.start('clean','concatminifycss','image','concatminifyjs');
});

// 静态服务器
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 代理

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});