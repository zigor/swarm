'use strict';

var webpack = require('webpack');
var path = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    entry: [ 'babel-polyfill/node_modules/core-js/modules/es6.promise', './src/main' ],
    
    output: {
        path: __dirname + '/dist',
        filename: 'build.js',
    },

    watch: NODE_ENV === 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === 'development' ? 'source-map' : 'null',

    plugins: [
        new webpack.DefinePlugin({ 'NODE_ENV': JSON.stringify(NODE_ENV) }), 
        new webpack.optimize.UglifyJsPlugin({ compress : {  dead_code:false }, mangle : true,  })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /modules/],
                query: {
                    presets: ['es2015'],                                        
                },                        
            }
        ]
    }
};