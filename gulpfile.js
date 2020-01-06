
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var posthtml = require('gulp-posthtml');
var include = require('posthtml-include');
var del = require('del');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');

// npm install --save-dev

gulp.task('htmlMinify', () => {
  return gulp.src('build/*.html')
    .pipe(htmlmin(
      { collapseWhitespace: true },
      {collapseInlineTagWhitespace: true},
      {removeComments: true}
      ))
    .pipe(gulp.dest('build'));
});

// ========== image compression tasks ==========
gulp.task('cleanCompressedImage', function () {
  return del('source/img/compressed');
  });

gulp.task('imageCompressor', function () {
  return gulp.src(['source/img/*.{png,jpg,svg}','!source/img/sprite/'&&'!source/img/compressed/' ])
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
        plugins: [
            {removeViewBox: false}
        ]
      })
    ]))
    .pipe(gulp.dest('source/img/compressed'));
});

gulp.task('webpConverter', function () {
  return gulp.src(['source/img/*.{png,jpg}','!source/img/compressed'])
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest('source/img/compressed'));
});

gulp.task('cleanSprite', function () {
  return del('source/img/compressed/sprite');
});

gulp.task('svgOmgToSprite', function () {
  return gulp.src(['source/img/sprite/*.svg','!source/img/compressed/'])
    .pipe(imagemin([
      imagemin.svgo({
          plugins: [
              {removeViewBox: false},
              {removeXMLNS: true},
              {cleanupListOfValues: true},
              {removeDimensions: true}
          ]
      })
    ]))
    .pipe(gulp.dest('source/img/compressed/sprite'));
});

// ========== build tasks ==========
gulp.task('cleanBuild', function () {
  return del('build');
});

gulp.task('svgSpriteToBuild', function () {
  return gulp.src('source/img/compressed/sprite/*.svg')
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('copyToBuild', function () {
  return gulp.src([
  'source/fonts/**/*.{woff,woff2}',
  'source/js/*.min.js',
  'source/*.ico'
  // 'source/img/favicon/*.*',

  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'));
});

gulp.task('imgCopyToBuild', function () {
  return gulp.src(
  ['source/img/compressed/*.{png,jpg,svg,webp}','!source/img/compressed/sprite']
  )
  .pipe(gulp.dest('build/img'));
});

gulp.task('faviconCopyToBuild', function () {
  return gulp.src(
    'source/img/favicon/*.*'
  )
  .pipe(gulp.dest('build'));
});

gulp.task('jsCompressor', function () {
  return gulp.src(['source/js/*.js','!source/js/*min.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" })) // Добавляем суффикс .min
    // .pipe(rename('script.min.css'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write('.'))
    .pipe(gulp.dest('build/css'));
    // .pipe(server.stream());
});

gulp.task('includeSpriteInHtml', function () {
  return gulp.src('source/*.html')
  .pipe(posthtml([ include() ]))
  .pipe(gulp.dest('build'));
})

// ========== complex image tasks ==========
gulp.task('svgSpriteCompression', gulp.series('cleanSprite', 'svgOmgToSprite', 'svgSpriteToBuild'));
gulp.task('imageCompression', gulp.series('cleanCompressedImage', 'imageCompressor', 'webpConverter', 'svgOmgToSprite'));

// ========== server tasks ==========
gulp.task('refresh', function (done) {
  server.reload();
  done();
  });

gulp.task('server', function () {
  server.init({
    // server: 'source/',
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{sass,scss}', gulp.series('css', 'refresh'));
  gulp.watch('source/js/**/*.js', gulp.series('jsCompressor','refresh'));
  gulp.watch('source/img/sprite/*.svg', gulp.series('svgSpriteCompression', 'includeSpriteInHtml', 'htmlMinify', 'refresh'));
  gulp.watch('source/*.html', gulp.series('includeSpriteInHtml', 'htmlMinify', 'refresh'));
  // gulp.watch('build/img/sprite.svg', gulp.series('includeSpriteInHtml', 'refresh'));
  // gulp.watch('source/*.html').on('change', server.reload);
});

// ========== complex build tasks ==========
gulp.task('build', gulp.series(
  'cleanBuild',
  'imageCompression',
  'svgSpriteToBuild',
  'copyToBuild',
  'imgCopyToBuild',
  'faviconCopyToBuild',
  'jsCompressor',
  'css',
  'includeSpriteInHtml',
  'htmlMinify'
  ));

gulp.task('start', gulp.series(
  // 'cleanBuild',
  // 'imageCompression',
  // 'svgSpriteToBuild',
  // 'imgCopyToBuild',
  // 'faviconCopyToBuild',
  'copyToBuild',
  'jsCompressor',
  'css',
  'includeSpriteInHtml',
  'htmlMinify',
  'server'));
