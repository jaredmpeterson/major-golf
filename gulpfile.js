var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var order = require('gulp-order');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
// var autoprefixer = require('gulp-autoprefixer');
// var postcss = require('gulp-postcss');

gulp.task('es6', function() {
  gulp.src(['public/js/*.js'])
  .pipe(babel({
    'presets': ['es2015']
  }))
  .pipe(order(['public/js/majorgolf.app.js', 'public/js/main.ctrl.js', 'public/js/golfer.ctrl.js', 'public/js/golfer.service.js']))
  .pipe(concat('majorgolf.js'))
  .pipe(gulp.dest('public/dist/'));
});

// gulp.task('autoprefixer', function () {
//     return gulp.src('public/styles/*.css')
//         .pipe(sourcemaps.init())
//         .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest('public/dist/'));
// });

gulp.task('sass', function() {
  return gulp.src('public/styles/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('public/dist/'));
});

gulp.watch('public/styles/*.scss', ['sass']);
gulp.watch(['public/js/*.js'], ['es6']);

gulp.task('default', ['es6', 'sass']);
