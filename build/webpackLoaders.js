const path = require('path')
const _ = require('lodash')

module.exports = {
    babelLoader: function () {
        return {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['env', {
                        modules: false
                    }]
                ],
                plugins: [
                    'react-hot-loader/babel',
                    'lodash'
                ]
            }
        }
    },
    tsLoader: function(tsCompilerOptionsOverwrite) {
        return {
            loader: 'ts-loader',
            options: {
                silent: true,
                transpileOnly: true,
                happyPackMode: true,
                compilerOptions: tsCompilerOptionsOverwrite,
                experimentalWatchApi: true
            }
        }
    },
    cssLoader: function () {
        return {
            loader: 'css-loader',
            options: {
                modules: true,
                localIndentName: '[local]'
            }
        }
    },
    threadLoaderInit: function(threadLoaderPlugin, warmupLoaders, options) {
        if(threadLoaderPlugin === undefined) return
        threadLoaderPlugin.warmup(options, warmupLoaders);
    },
}