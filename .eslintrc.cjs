module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:solid/typescript',
        'plugin:tailwindcss/recommended',
        "prettier",
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.js'],
    parser: '@typescript-eslint/parser',
    rules: {
        '@typescript-eslint/no-unused-vars': [
            'warn', { argsIgnorePattern: '^_' }
        ],
        "tailwindcss/no-custom-classname": ["off"],
        "tailwindcss/classnames-order": ["off"],
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.node.json'],
        ignorePatterns: ['dist', './tailwind.config.js'],
        tsconfigRootDir: __dirname,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
            typescript: {}
        }
    },
    plugins: ['solid']
};


