

let gulp = require('gulp');
let plumber = require('gulp-plumber');
let sourcemap = require('gulp-sourcemaps');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let server = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});

gulp.task('server', function () {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('css', 'server'));
