const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Copy All HTML files
gulp.task('copyHtml', function(){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
});

// Copy Fonts
gulp.task('copyFonts', function(){
  gulp.src('bower_components/font-awesome/fonts/*')
      .pipe(gulp.dest('dist/fonts/'));
})

// Copy Bootstrap js
gulp.task('copyBootstrapJS', function(){
  gulp.src('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js')
      .pipe(gulp.dest('dist/js/'));
})

// Copy jQuery js
gulp.task('copyjQueryJS', function(){
  gulp.src('bower_components/jquery/dist/jquery.min.js')
      .pipe(gulp.dest('dist/js/'));
})

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
		.pipe(gulp.dest('dist/images'))
);

// Compile Sass
gulp.task('sass', function(){
  gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function(){
  // Minify and copy
  gulp.src('src/js/*')
      .pipe(concat('script.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['copyHtml', 'copyFonts', 'copyBootstrapJS', 'copyjQueryJS', 'imageMin', 'sass', 'scripts']);

gulp.task('watch', function(){
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/images/*', ['imageMin']);
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['copyHtml']);
  gulp.watch('src/fonts/*', ['copyFonts']);
  gulp.watch('bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', ['copyBootstrapJS']);
  gulp.watch('bower_components/jquery/dist/jquery.min.js', ['copyjQueryJS']);
});