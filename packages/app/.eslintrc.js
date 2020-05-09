const baseConfiguration = require('../../.eslintrc.js');

module.exports = {
    extends: [
        '../../.eslintrc.js',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        'react',
    ],
    rules: {
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
