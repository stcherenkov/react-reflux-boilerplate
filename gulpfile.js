'use strict';

var gulp = require('gulp')
var sequence = require('run-sequence')
var path = require('path')

require('./gulp/webpack')(gulp)
require('./gulp/svg-sprite')(gulp)
require('./gulp/copy')(gulp)

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

gulp.task('production', ['copy:html', 'sprite:build'], function (callback) {
    sequence(   
        'webpack:add:vendor',
        'webpack:add:index',
        'webpack:production',
        callback
    )
})
