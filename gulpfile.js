'use strict'
// load libraries 
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()

// Sync with browser, proxy through Node server on 8080
gulp.task('browserSync', function() {
    browserSync.init ( {
      proxy: 'localhost:8080',
      browser: 'google chrome'
    })
})

// Compile SASS into CSS and auto-inject into browser
gulp.task('sass', function() {
    return gulp.src('./css/**/*.scss')
        .pipe(sass({
          outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
})

// Run just the tasks
gulp.task('default', ['sass'])

// Watch and serve
gulp.task('serve', ['sass', 'browserSync'], function(){
    gulp.watch('./**/*.html').on('change', browserSync.reload)

    gulp.watch('./css/**/*.scss', ['sass'])

    gulp.watch('./css/**/*.css').on('change', browserSync.reload)
})