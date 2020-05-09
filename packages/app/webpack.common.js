const { resolve } = require('path');

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
    resolve: {
        extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.sass'],
    },
};
