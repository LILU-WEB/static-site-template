// ****************************************
//
//   Gulpfile
//
// ****************************************
//
// Available tasks:
//   `gulp`
//   `gulp serve`
//   `gulp build`
//   `gulp build:css`
//   `gulp lint:css`
//   `gulp build:static`
//   `gulp build:html`
//   `gulp build:icons`
//   `gulp build:img`
//   `gulp build:js`
//   `gulp watch`
//   `gulp watch:css`
//   `gulp watch:static`
//   `gulp watch:html`
//   `gulp watch:icons`
//   `gulp watch:img`
//   `gulp watch:js`
//   `gulp clean`
//   `gulp clean:css`
//   `gulp clean:static`
//   `gulp clean:html`
//   `gulp clean:icons`
//   `gulp clean:img`
//   `gulp clean:js`
//
// ****************************************

// ----------------------------------------
//   Modules
// ----------------------------------------
//
// @babel/core          : Babel compiler core
// @babel/preset-env    : A Babel preset for each environment
// autoprefixer         : Parse CSS and add vendor prefixes to CSS rules
// babel-loader         : transpiling JavaScript files using Babel and webpack
// browser-sync         : Keep multiple browsers & devices in sync
// cssnano              : A modular minifier, built on top of PostCSS
// del                  : Delete files and folders using globs
// event-stream         : Construct pipes of streams of events
// gulp                 : The streaming build system
// gulp-beautify        : Asset beautification using js-beautify
// gulp-changed         : Only pass through changed files
// gulp-clone           : Duplicate files in memory
// gulp-data            : Generate a data object for other plugins to consume
// gulp-eslint          : A gulp plugin for ESLint
// gulp-filter          : Filter files in a vinyl stream
// gulp-if              : Conditionally control the flow of vinyl objects
// gulp-imagemin        : Minify PNG, JPEG, GIF and SVG images with imagemin
// gulp-plumber         : Prevent pipe breaking caused by errors from plugins
// gulp-postcss         : PostCSS gulp plugin
// gulp-pug             : Gulp plugin for compiling Pug templates
// gulp-pug-inheritance : Rebuild only changed pug files and all it dependencies
// gulp-sass            : Sass plugin for Gulp
// gulp-sourcemaps      : Write inline source maps
// gulp-stylelint       : Run stylelint results through a list of reporters
// gulp-svg-sprite      : Create SVG sprites
// gulp-tap             : Easily tap into a pipeline.
// gulp-uglify          : Minify JavaScript with UglifyJS3
// gulp-wait            : Insert a delay before calling the next function
// imagemin-mozjpeg     : Imagemin plugin for mozjpeg
// lazypipe             : Create immutable, lazily-initialized pipelines
// minimist             : Parse argument options
// require-dir          : Helper to require() directories
// stylelint            : A mighty, modern CSS linter
// stylelint-scss       : A collection of SCSS specific rules for stylelint
// vinyl-named          : Give vinyl files arbitrary chunk names
// webpack              : A module bundler
// webpack-stream       : Run webpack as a stream
// yaml                 : JavaScript parser and stringifier for YAML
//
// ----------------------------------------

const browserSync = require('browser-sync');
const gulp = require('gulp');
const requireDir = require('require-dir');

const config = require('./gulp/config');

requireDir('./gulp/tasks', {recurse: true});

global.isWatching = false;

// ----------------------------------------
//   Task: Clean
// ----------------------------------------

gulp.task('clean', gulp.parallel(
    'clean:css',
    'clean:static',
    'clean:html',
    'clean:icons',
    'clean:img',
    'clean:js'
));

// ----------------------------------------
//   Task: Build
// ----------------------------------------

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        gulp.series(
            'build:icons',
            'lint:css',
            'build:css',
            'build:img'
        ),
        'build:static',
        'build:html',
        'build:js'
    )
));

// ----------------------------------------
//   Task: Watch
// ----------------------------------------

gulp.task('watch', gulp.parallel(
    'watch:css',
    'watch:static',
    'watch:html',
    'watch:icons',
    'watch:img',
    'watch:js'
));

// ----------------------------------------
//   Task: Serve
// ----------------------------------------

gulp.task('serve', () => {
    return browserSync.init(config.plugins.browserSync);
});

// ----------------------------------------
//   Task: Default
// ----------------------------------------

gulp.task('default', gulp.series(
    'build',
    gulp.parallel('serve', 'watch')
));
