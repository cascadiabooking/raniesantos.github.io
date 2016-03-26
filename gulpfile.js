var	browserSync		= require("browser-sync").create(),
		gulp					= require("gulp"),
		autoprefixer	= require("gulp-autoprefixer"),
		include				= require("gulp-include"),
		rename				= require("gulp-rename"),
		sass					= require("gulp-sass"),
		shell					= require("gulp-shell"),
		sourcemaps		= require("gulp-sourcemaps"),
		uglify				= require("gulp-uglify"),
		watch					= require("gulp-watch");

// =========================================================================
// CSS Task
// =========================================================================
gulp.task("styles", function() {
	return gulp
		.src("./_source/styles/site.scss", { base: "." })
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
		.pipe(rename("site.css"))
		.pipe(gulp.dest("./assets/css"));
});

// =========================================================================
// JS Task
// =========================================================================
gulp.task("scripts", function() {
	return gulp
		.src("./_source/scripts/site.js")
		.pipe(sourcemaps.init())
		.pipe(include())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest("./assets/js"));
});

// =========================================================================
// Watch Task
// =========================================================================
gulp.task("watch", function(){
	gulp.watch("./_source/scripts/**/*", ["scripts"]);
	gulp.watch("./_source/styles/**/*", ["styles"]);
});

// =========================================================================
// Browsersync Task
// =========================================================================
gulp.task("browser-sync", function(){
	browserSync.init({
		online: false,
		server: { baseDir: "_site/" },
		notify: false
	});
	gulp.watch("_site/**/*").on("change", browserSync.reload);
});

// =========================================================================
// Jekyll Build
// =========================================================================
gulp.task("build", shell.task(["jekyll build --watch"]));

// =========================================================================
// Default Task
// =========================================================================
gulp.task("default", ["watch", "build", "browser-sync"]);
