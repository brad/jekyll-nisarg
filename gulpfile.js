var gulp = require('gulp');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var fs = require('fs');
var merge = require('merge-stream');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('bundle', ['exec', jekyll, 'build'], { stdio: 'inherit' })
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build', 'fonts', 'sass', 'js'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build', 'fonts', 'sass', 'js'], function () {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('clean:fonts', function () {
    return gulp.src('_site/assets/fonts').pipe(clean({ force: true }));
});

gulp.task('fonts', ['clean:fonts', 'sass'], function () {
    if (!fs.existsSync('_site/assets/fonts')) {
        fs.mkdirSync('_site/assets/fonts');
    }
    return gulp.src([
        './node_modules/font-awesome/fonts/*',
    ]).pipe(gulp.dest('_site/assets/fonts/'));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    var sassStream,
    cssStream;

    //compile sass
    sassStream = gulp.src('src/scss/style.scss')
        .pipe(sass({
            includePaths: ['scss'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 3 versions'], { cascade: true }));

    //select additional css files
    cssStream = gulp.src([
        './node_modules/font-awesome/css/font-awesome.css',
        './node_modules/bootstrap/dist/css/bootstrap.css',
    ]);

    //merge the two streams and concatenate their contents into a single file
    return merge(cssStream, sassStream)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/bootstrap.js',
        './node_modules/html5shiv/dist/html5shiv.js',
    ].concat(['src/js/*']))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('_site/assets/js'))
        .pipe(browserSync.reload({ stream: true }));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['src/scss/*.scss', 'src/scss/*/*.scss'], ['sass']);
    gulp.watch(['src/js/*.js'], ['js']);
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);