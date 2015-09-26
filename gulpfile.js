
var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache');

	var src = 'src/';


// Compress Images
gulp.task('image', function(){
	gulp.src('app/img/*')
		.pipe(imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
		.pipe(gulp.dest('public/img'));	
	});

// Watch for changes in files
gulp.task('watch', function() {
	// watch image files
	gulp.watch(src + 'img/**/*', ['image']);
	});



// allows you to just type 'gulp' in terminal
gulp.task('default', ['watch','image']); 

