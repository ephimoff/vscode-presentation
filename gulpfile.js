var gulp           = require('gulp'),
    browserSync    = require('browser-sync').create(),
    nunjucksRender = require('gulp-nunjucks-render'),
    rename         = require('gulp-rename'),
    stylus         = require('gulp-stylus'),
    imagemin       = require('gulp-imagemin'),
    jshint         = require('gulp-jshint');

// Lets us type "gulp" on the command line and run all of our tasks
gulp.task('default', ['stylus', 'img', 'js', 'css', 'plugin', 'nunjucks', 'lib', 'watch']);

// Compress and minify images to reduce their file size
gulp.task('img', function () {
  return gulp.src('src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('docs/lib/img'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Hint all of our custom developed Javascript to make sure things are clean
gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Compile stylus stylesheets to css
gulp.task('stylus', function () {
  return gulp.src('src/css/**/*.+styl')
    .pipe(stylus())
    .pipe(rename({ extname: '.css' }))
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Move all css to docs
gulp.task('css', function () {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Copy everything from lib and plugins to docs
gulp.task('lib', function () {
  return gulp.src('src/lib/**/*')
    .pipe(gulp.dest('docs/lib'));
});

gulp.task('plugin', function () {
  return gulp.src('src/plugin/**/*')
    .pipe(gulp.dest('docs/plugin'));
});

// Compile all nunjucks to html
gulp.task('nunjucks', function () {
  return gulp.src('src/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['src/templates']
    }))
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('watch', ['browserSync', 'css', 'img', 'stylus', 'js', 'lib', 'nunjucks'], function () {
  // Whenever a stylesheet is changed, recompile
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('src/css/**/*.+styl', ['stylus']);

  // Whenever a template is changed, recompile
  gulp.watch('src/pages/*.+(html|nunjucks)', ['nunjucks']);
  gulp.watch('src/templates/**/*.+(html|nunjucks)', ['nunjucks']);

  // If user-developed Javascript is modified, re-run the hinter
  gulp.watch('src/js/**/*.js', ['js']);
  

  // If an image is modified, run our images task to compress images
  gulp.watch('src/img/*', ['img']);

  // If there are some changes copy them to the docs folder
  gulp.watch('src/lib/**/*', ['lib']);
  gulp.watch('src/plugin/**/*', ['plugin']);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'docs'
    },
  });
});