// Load plugins
var gulp = require('gulp'),
    request = require('request'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    lrserver = require('tiny-lr'),
    http = require('http'),
    cookieParser = require('cookie-parser'),
    run = require('gulp-run'),
    minify = require('gulp-minify'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-cssmin'),
    server = lrserver();

//Check
gulp.task('check', function() {
    return gulp.src(['src/sass/**/*.scss', 'src/scripts/**/*.js', 'src/views/*.html', 'src/images/**/*', 'index.html'], ['livereload'])
    .pipe(livereload());
});

// Styles
gulp.task('styles', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/styles'))
    .pipe(notify({ message: 'Your Style is ready! Good job Maria :)' }))
    .pipe(connect.reload());
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['-min.js']
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(notify({ message: 'Your Scripts are ready! Go Maria go!!!' }))
    .pipe(connect.reload());
});

//Connect
gulp.task('connect', function() {
    connect.server({
        root: '',
        port: 8080,
        livereload: true  
    });
});

// HTML
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'HTML task complete' }))
        .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }))
    .pipe(connect.reload());
});

// Clean
gulp.task('clean', function() {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
    .pipe(clean());
});

//Watch
gulp.task('watch', function() {
    livereload();
    gulp.watch(['index.html'], ['html', 'check']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
    gulp.watch('src/views/*.html', ['html']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.run('styles', 'scripts', 'images', 'html', 'connect', 'livereload');
});

//Livereload task
gulp.task('livereload', ['check', 'watch']);



