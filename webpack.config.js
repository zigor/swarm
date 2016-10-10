'use strict';

var webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {

    entry: './src/main',
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
        new webpack.DefinePlugin({ 'NODE_ENV': JSON.stringify(NODE_ENV) })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};