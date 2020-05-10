const { resolve } = require('path');
const { DefinePlugin } = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: resolve(__dirname, 'src', 'index.tsx'),
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
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        new DefinePlugin({
            'process.env.SERVER_URL': JSON.stringify(
                process.env.SERVER_URL || 'http://localhost:4000/graphql'
            ),
            'process.env.NODE_ENV': JSON.stringify(
                process.env.NODE_ENV
            ),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.sass'],
    },
};
