'use strict';

var webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    entry: ['babel-polyfill', './src/main'],
    
    output: {
        path: __dirname + '/dist',
        filename: 'build.js',
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : null,

    plugins: [
        new webpack.DefinePlugin({ 'NODE_ENV': JSON.stringify(NODE_ENV) }), 
        new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, dead_code: true, drop_debugger: true }, mangle : true,  })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/],
                query: {
                    presets: ['es2015']
                },
                "plugins": [
                     ["transform-runtime", {
                        "polyfill": false
                    }]
                ]                
            }
        ]
    }
};