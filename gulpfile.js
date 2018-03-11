var gulp = require('gulp'),
    less = require('gulp-less'),
    mincss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    pathCss = 'css',
    pathLess = 'less',
    paths = {
        html: ['index.html'],
        css: 'css',
        less: 'less'
    }

gulp.task('less', function () {
  	return gulp.src(pathLess + '/style.less')
  	   .pipe(less())
  	   .pipe(gulp.dest(pathCss))
  	;
});

gulp.task('mincss', ['less'], function(){
  return gulp.src(pathCss + '/style.css')
    .pipe(mincss())
    .pipe(rename(function (path) {
        path.basename += ".min";
    }))
    .pipe(gulp.dest(pathCss))
    .pipe(reload({stream:true}));
});

gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// Browser-Sync
// // /////////////////////////////////////////////
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});
gulp.task('watcher',function(){
  gulp.watch(paths.less + '/style.less', ['mincss']);
  gulp.watch(paths.html, ['html']);
});
gulp.task('default', ['watcher', 'browserSync']);
