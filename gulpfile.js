// import from npm
var gulp = require('gulp'),
	minifyHTML = require('gulp-minify-html'), 
	sass = require('gulp-sass'),
	uncss = require('gulp-uncss'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	concat = require('gulp-concat'),
	concatCSS = require('gulp-concat-css'),
	rename = require('gulp-rename');

	var src = 'src/';
	var dest = 'build/';

// Index - Minify
gulp.task('minify-index', function() {
	var opts = {
		conditionals: true,
		spare: true
	};

	return gulp.src(['src/main.html'])
		.pipe(minifyHTML(opts))
		.pipe(rename('index.html'))
		.pipe(gulp.dest('./'));
	});

// Compile Sass
gulp.task('sass', function () {
  gulp.src('src/css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

// CSS - Remove Unused -> concat -> minify
gulp.task('styles', function(){
	return gulp.src(['src/css/custom.css', 'src/css/main.css', 'src/css/normalize.css'])
		.pipe(uncss({
			html: ['src/main.html'], ignore: [
       		]
		}))
		.pipe(concatCSS('all.css'))
		.pipe(uglifycss())
		.pipe(gulp.dest('build/css'));
	});

// JS - Concat -> minify
gulp.task('scripts', function(){
	return gulp.src(['src/js/main.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('build/js'));

	});

// Compress Images
gulp.task('image', function(){
	gulp.src('src/img/**/*')
		.pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
		.pipe(gulp.dest('build/img'));	
	});

// Watch for changes in files
gulp.task('watch', function() {
	// watch index.html
	gulp.watch(src + 'main.html', ['minify-index']);
	// watch .css files
	gulp.watch(src + 'css/*.css', ['styles']);
	// watch .js files 
	gulp.watch(src + 'js/main.js', ['scripts']);
	// watch image files
	gulp.watch(src + 'img/**/*', ['image']);
	});

// Watch Sass files
gulp.task('sass:watch', function () {
  gulp.watch(src + 'css/*.scss', ['sass']);
});


// allows you to just type 'gulp' in terminal
gulp.task('default', ['watch', 'sass', 'sass:watch', 'minify-index', 'styles', 'scripts', 'image']); 

