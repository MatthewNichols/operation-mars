/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var LessPluginCleanCSS = require('less-plugin-clean-css')
var cleanCSS  = require('gulp-clean-css');
var rename     = require('gulp-rename');

const fallingShipTsFiles = "Scripts/PageScripts/FallingShip/*.ts";
const cssDir = 'Content/';

gulp.task('compileTypescript', () => {
	console.log("compileTypescript");
	var tsResult = gulp.src(fallingShipTsFiles)
		.pipe(sourcemaps.init())
		.pipe(ts({
			module: "amd",
			out: "Scripts/PageScripts/site.js"
		}))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("."));
});

gulp.task('updateDocArea', () => {
	gulp.src("Scripts/PageScripts/site.js")
		.pipe(gulp.dest("../../docs/Scripts/PageScripts"));

	const contentDest = "../../docs/Content";
	gulp.src("Content/**/*.*")
		.pipe(newer(contentDest))
		.pipe(gulp.dest(contentDest));
});

gulp.task('compileLess', () => {
	console.log("compile less");

	return gulp.src(`${cssDir}/*.less`)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(cssDir));

});

gulp.task('compileLessMinified', () => {
	console.log("compile less min");

	var cssCleanPlugin = new LessPluginCleanCSS();

	return gulp.src(`${cssDir}/*.less`)
		.pipe(sourcemaps.init())
		.pipe(less({
			plugins: [cssCleanPlugin]
		}))
        .pipe(rename({suffix: '.min'}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(cssDir));

});

gulp.task('compileLessRegularAndMinified', ['compileLess', 'compileLessMinified'])

gulp.task('default', () => {
	gulp.watch(fallingShipTsFiles, ["compileTypescript"]);
	//gulp.watch(`${cssDir}/*/*.scss`, ["compileSass"]);
});