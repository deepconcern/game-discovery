const CopyPlugin = require('copy-webpack-plugin');
const { config } = require('dotenv');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path');
const { DefinePlugin } = require('webpack');

config();

const TEMPLATES_DIR = resolve(__dirname, 'templates');

module.exports = {
    devtool: 'inline-source-map',
    entry: resolve(__dirname, 'src', 'index.tsx'),
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.(js|ts)x?$/,
            },
        ],
    },
    output: {
        chunkFilename: '[name].bundle.js',
        filename: '[name].bundle.js',
        path: resolve(__dirname, '..', '..', 'public'),
        publicPath: 'public/'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'assets', to: '.' }
            ]
        }),
        new DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(
                process.env.SERVER_URL
            ),
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV
            ),
        }),
        new HTMLWebpackPlugin({
            filename: process.env.NODE_ENV === 'production' ? join('..', 'index.html') : 'index.html',
            inject: 'body',
            template: resolve(TEMPLATES_DIR, 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.sass'],
    },
};
