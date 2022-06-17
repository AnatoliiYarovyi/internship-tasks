export default {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 4],
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_id'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
        ],
        'newlines-between': 'always',
      },
    ],
    'max-len': [
      'error',
      {
        code: 150,
        tabWidth: 2,
        ignoreRegExpLiterals: true,
      },
    ],
    'sort-imports': [
      2,
      {
        ignoreCase: false,
        allowSeparatedGroups: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'single', 'all', 'multiple'],
      },
    ],
  },
};
