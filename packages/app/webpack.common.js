const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { DefinePlugin } = require('webpack');

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
        chunkFilename: 'js/[name].bundle.js',
        filename: 'js/[name].bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        new DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(
                process.env.SERVER_URL || 'http://localhost:4000/graphql'
            ),
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV === 'production' ? 'production' : 'development'
            ),
        }),
        new HTMLWebpackPlugin({
            inject: 'body',
            template: resolve(TEMPLATES_DIR, 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.sass'],
    },
};
