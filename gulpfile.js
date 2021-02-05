const { watch, src, dest, parallel } = require('gulp');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify-es').default;
const gulpIf = require('gulp-if');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

function watching() {
  watch([
    './css/**/*.css',
    './js/**/*.js',
    './index.html'
  ]).on('change', browserSync.reload)
}

function assets() {
  return src('./assets/**/*')
      .pipe( dest('dist/assets') )
}

function build(){
  return src('index.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(dest('dist'))
}

exports.dev = function (cb) {
  browsersync();
  watching();
  cb();
};

exports.prod = parallel(assets, build);

