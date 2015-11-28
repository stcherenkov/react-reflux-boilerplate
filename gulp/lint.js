var eslint = require('gulp-eslint')

module.exports = function (gulp) {
    
    gulp.task('lint', function () {
        return gulp.src(['./src/js/**/*.js', './src/js/**/*.jsx'])
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
    })
}
