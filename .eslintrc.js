module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'prettier/react',
      'prettier/@typescript-eslint',
    ],
    ignorePatterns: [
        'dist/',
        'node_modules/',
        'packages/schema/src/index.tsx'
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            extends: [
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
            ],
            files: [
                './packages/*/*.js',
                './*.js'
            ],
            plugins: [
                'node',
            ],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'prettier',
    ],
    root: true,
    rules: {
        'array-callback-return': 'error',
        'eol-last': 'error',
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'array' }],
        '@typescript-eslint/ban-ts-comment': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'], 
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowExpressions: true
        }],
        '@typescript-eslint/member-delimiter-style': ['error', {
            'multiline': {
                'delimiter': 'comma',
                'requireLast': true
            },
            'singleline': {
                'delimiter': 'comma',
                'requireLast': false
            },
            'overrides': {
                'interface': {
                    'multiline': {
                        'delimiter': 'semi',
                        'requireLast': true
                    }
                }
            }
        }],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-expressions': 'error',
        '@typescript-eslint/no-unused-vars': ['error', {
            argsIgnorePattern: '^_'
        }],
    },
};