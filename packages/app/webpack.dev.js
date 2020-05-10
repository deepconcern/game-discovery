const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const merge = require('webpack-merge');

const ROOT_DIR = resolve(__dirname, '..', '..');
const TEMPLATES_DIR = resolve(ROOT_DIR, 'templates');

const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
    devServer: {
        contentBase: './dist/',
        
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test:/\.pug$/,
                loader: 'pug-loader'
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            inject: false,
            template: resolve(TEMPLATES_DIR, 'index.pug'),
            templateParameters: {
                scriptUrl: 'main.bundle.js',
            },
        }),
    ],
});
