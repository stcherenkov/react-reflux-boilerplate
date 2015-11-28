'use strict'

var gulp = require('gulp')
var sequence = require('run-sequence')
var path = require('path')

require('./gulp/webpack')(gulp)
require('./gulp/svg-sprite')(gulp)
require('./gulp/copy')(gulp)
require('./gulp/lint')(gulp)

gulp.task('default', ['copy:html', 'sprite:watch'], function (callback) {
    sequence(   
        'webpack:add:vendor',
        'webpack:add:index',
        'webpack:development',
        callback
    )
})

gulp.task('vendor', ['sprite:build'], function (callback) {
    sequence(
        'webpack:add:vendor',
        'webpack:production',
        callback
    )
})

gulp.task('production', ['lint', 'copy:html', 'sprite:build'], function (callback) {
    sequence(   
        'webpack:add:vendor',
        'webpack:add:index',
        'webpack:production',
        callback
    )
})
