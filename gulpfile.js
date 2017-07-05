'use strict';

var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var rename         = require('gulp-rename');
var stylus         = require('gulp-stylus');

gulp.task('stylus', function () {
    return gulp.src('./src/css/**/*.+styl')
      .pipe(stylus())
      .pipe(rename({ extname: '.css' }))
      .pipe(gulp.dest('./docs/css'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('css', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(gulp.dest('./docs/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('js', function () {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./docs/js'))
        .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('readme', function () {
    return gulp.src('README.md')
        .pipe(gulp.dest('./docs/'));
});

gulp.task('lib', function () {
    return gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./docs/lib'));
});

gulp.task('img', function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest('./docs/lib/img'))
        .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('plugin', function () {
    return gulp.src('./src/plugin/**/*')
        .pipe(gulp.dest('./docs/plugin'));
});


gulp.task('nunjucks', function() {
  return gulp.src('./src/pages/**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
    path: ['./src/templates']
  }))
  .pipe(gulp.dest('./docs'))
  .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'css', 'nunjucks'], function () {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/css/**/*.+styl', ['stylus']);
  gulp.watch('./src/pages/*.+(html|nunjucks)', ['nunjucks']);
  gulp.watch('./src/templates/**/*.+(html|nunjucks)', ['nunjucks']); 
  gulp.watch('./src/js/**/*.js', ['js']); 
  gulp.watch('./src/lib/**/*', ['lib']); 
  gulp.watch('./src/img/*', ['img']); 
  gulp.watch('./src/plugin/**/*', ['plugin']); 
  gulp.watch('README.md', ['readme']); 
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'docs'
    },
  })
})