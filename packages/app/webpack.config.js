const HTMLWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    devtool: 'source-map',
    entry: resolve(__dirname, 'src', 'index.tsx'),
    mode:
        process.env['NODE_ENV'] === 'production' ? 'production' : 'development',
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.(js|ts)x?$/,
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: resolve(__dirname, 'templates', 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.sass'],
    },
};
