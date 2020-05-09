const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const merge = require('webpack-merge');

const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new HTMLWebpackPlugin({
            template: resolve(__dirname, 'templates', 'index.html'),
        }),
    ],
});
