const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


/* Watch for changes */
gulp.task('serve', function () {

  browserSync.init({
    server: "./dist"
  });

  gulp.watch('./sass/**/*.scss', ['styles']);
  gulp.watch('.index.html,', ['copy-html']);
  gulp.watch('./dist/index.html').on('change', browserSync.reload);
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./dist/js/*.js').on('change', browserSync.reload);
});

/* Compile sass into CSS & auto-prefix & auto-inject into browsers */
gulp.task('styles', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});


gulp.task('scripts', function () {
  gulp.src('./js/*')
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('copy-html', function () {
  gulp.src('./index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['styles', 'copy-html', 'scripts', 'serve']);