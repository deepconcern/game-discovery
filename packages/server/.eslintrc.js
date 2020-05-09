module.exports = {
    env: {
        node: true,
    },
    extends: [
        '../../.eslintrc.js',
        'plugin:node/recommended',
    ],
    parserOptions: {
        sourceType: 'module'
    },
    plugins: [
    'node'
    ],
    rules: {
        'node/no-missing-import': ['error', {
            tryExtensions: ['.js', '.json', '.node', '.ts', '.d.ts']
        }],
        'node/no-unsupported-features/es-syntax': 'off',
    },
};
