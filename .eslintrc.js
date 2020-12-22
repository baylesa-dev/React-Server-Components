const { resolve } = require('path');

module.exports = {
    root: true,
    plugins: [
        'react',
        'react-hooks',
        'jsx-a11y',
        'import',
        '@typescript-eslint',
    ],
    parserOptions: {
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        ecmaVersion: 2018,
        ecmaFeatures: {
            jsx: true,
        },
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                project: [
                    resolve(__dirname, './tsconfig.json'),
                ],
            },
        },
    },
    rules: {
        'react/react-in-jsx-scope': 0,
        "react/jsx-filename-extension": 0,
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/ban-ts-comment': [
            'error',
            { 'ts-ignore': 'allow-with-description' },
        ],
        'no-unneeded-ternary': 1,
        'func-names': 0,
        'no-console': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': ['error', 'never'],
        'import/no-cycle': 0,
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                ],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'builtin',
                        position: 'before',
                    },
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
            },
        ],
        'import/prefer-default-export': 0,
    },
};
