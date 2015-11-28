'use strict'

var sprite = require('gulp-svg-sprite')({
        mode: {
            view: {
                dest: '',
                sprite: 'sprite.svg',
                bust: false
            }
        }
    })
var watch = require('gulp-watch')

module.exports = function (gulp) {

    gulp.task('sprite:build', function () {
        gulp.src('./src/images/**/*.svg')
            .pipe(sprite)
            .pipe(gulp.dest('./build'))
    })

    gulp.task('sprite:watch', function () {
        gulp.src('./src/images/**/*.svg')
            .pipe(watch('./src/images/**/*.svg'))
            .pipe(sprite)
            .pipe(gulp.dest('./build'))
    })
}
