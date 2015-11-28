'use strict'

module.exports = function (gulp) {

    gulp.task('copy:html', function () {
        gulp.src('./src/*.html')
            .pipe(gulp.dest('./build'))
    })

}
