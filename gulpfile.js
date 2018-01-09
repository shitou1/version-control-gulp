const gulp = require('gulp');
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

// 生成带有版本号的css文件
gulp.task('css', function () {
    return gulp.src('../static/css/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('../static/css'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});


// 生成带有版本号的js文件
gulp.task('script', function () {
    return gulp.src('../vue-static/dist/**/*.js')
        .pipe(rev())
        .pipe(gulp.dest('../vue-static/build-dist'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

// 复制其他文件文件
gulp.task('others', function () {
    return gulp.src(['../vue-static/dist/**/*.*', '!../vue-static/dist/**/*.js'])
        .pipe(rev())
        .pipe(gulp.dest('../vue-static/build-dist'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

gulp.task('default', ['css', 'script', 'others'], function () {
    return gulp.src(['rev/**/*.json', '../views/**/*.jsp'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'css',
                'dist': 'build-dist/'
            }
        }) )
        .pipe( gulp.dest('../views') );
});