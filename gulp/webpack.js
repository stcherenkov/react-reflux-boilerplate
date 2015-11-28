'use strict'

var gutil = require('gulp-util')
var fs = require('fs')
var path = require('path')
var _ = require('lodash')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var LiveReloadPlugin = require('webpack-livereload-plugin')

var postcss = {
    nested: require('postcss-nested'),
    autoprefixer: require('autoprefixer')
}

var config = {
    context: path.resolve('./src/js'),
    entry: {},
    output: {
        path: path.resolve('./build/'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test:   /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'core_modules'],
        extensions: ['', '.jsx', '.js']
    },
    postcss: function () {
        return {
            defaults: [postcss.nested, postcss.autoprefixer]
        }
    },
    plugins: []
}

module.exports = function (gulp) {
    var server = {}

    /**
     * Adds vendor package-specific configuration
     */

    gulp.task('webpack:add:vendor', function () {
        config.entry.vendor = [
            'axios',
            'classnames',
            'history',
            'react',
            'react-bootstrap',
            'react-dom',
            'react-router',
            'reflux'
        ]
        config.plugins = config.plugins.concat([
            new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
        ])
    })

    /**
     * Adds entry point and specific configuration
     */

    gulp.task('webpack:add:index', function () {
        config.entry.index = './index/main.jsx'
    })

    /**
     * Main development task
     *
     * Please call webpack:add:whatever tasks before running this one
     */

    gulp.task('webpack:development', function (callback) {
        var bundler

        config.watch = true
        config.plugins = config.plugins.concat([
            new webpack.SourceMapDevToolPlugin(),
            new LiveReloadPlugin({
                appendScriptTag: true
            })
        ])
        config.devtool = 'eval'

        bundler = webpack(config)

        server.instance = new WebpackDevServer(bundler, {
            contentBase: './build',
            stats: {
                chunks: false,
                colors: true
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })

        server.instance.listen(4242, 'localhost', function (err) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'server avaliable at http://localhost:4242/')
        })
    })

    /**
     * Main production task
     *
     * Please call webpack:add:whatever tasks before running this one
     */

    gulp.task('webpack:production', function (callback) {
        config.plugins = config.plugins.concat([
            new webpack.DefinePlugin({
                "process.env": {
                    // This has effect on the react lib size
                    "NODE_ENV": JSON.stringify("production")
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ])

        webpack(config, function(err, stats) {
            if (err) {
                throw new gutil.PluginError('Webpack', err)
            }

            gutil.log(gutil.colors.cyan('[Webpack]'), 'Output:\n' + stats.toString({
                chunks: false
            }))
            callback()
        })
    })

    return server
}
