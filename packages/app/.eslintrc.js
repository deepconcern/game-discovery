module.exports = {
    extends: [
        '../../.eslintrc.js',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:node/recommended',
            ],
            files: [
                './*.js',
                './scripts/*.js',
            ],
            plugins: [
                'node',
            ],
            rules: {
                'node/no-extraneous-require': 'off',
                'node/no-unpublished-require': 'off',
                'node/shebang': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
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
        'react/display-name': 'off',
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
