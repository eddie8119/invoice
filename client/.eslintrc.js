module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'prettier',
    'react',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // React 規則
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],

    // 引入排序規則
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React 和 React Native 相關
          ['^react$', '^react-native$'],
          // Expo 相關
          ['^expo'],
          // 第三方庫
          ['^@?\\w'],
          // 相對路徑導入
          [
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',

    // 強制換行規則
    'max-len': ['error', { code: 80 }],
    'object-curly-newline': [
      'error',
      {
        ImportDeclaration: { multiline: true, minProperties: 3 },
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    'object-property-newline': [
      'error',
      { allowAllPropertiesOnSameLine: false },
    ],
    'object-curly-spacing': ['error', 'always'],

    // 強制引入換行
    'import/newline-after-import': ['error', { count: 1 }],
    'import/max-dependencies': ['error', { max: 15 }],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
