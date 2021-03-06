const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');

const commonConfiguration = require('./webpack.common');

module.exports = merge(commonConfiguration, {
    devtool: 'source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
    ]
});
