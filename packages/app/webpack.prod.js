const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require('path');
const merge = require('webpack-merge');

const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    output: {
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});
