import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  { ignores: ['eslint.config.mjs'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: eslintPluginImport,
      react: eslintPluginReact,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
      'typescript-sort-keys': eslintPluginTypescriptSortKeys,
    },
    rules: {
      // import 並び順
      'import/order': [
        'error',
        {
          alphabetize: { order: 'asc' },
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
          'newlines-between': 'always',
          pathGroups: [
            { group: 'internal', pattern: '@/utils/**', position: 'before' },
            { group: 'internal', pattern: '@/libs/**', position: 'before' },
            { group: 'internal', pattern: '@/hooks/**', position: 'before' },
            { group: 'internal', pattern: '@/components/**', position: 'before' },
            { group: 'internal', pattern: '@/const/**', position: 'before' },
            { group: 'internal', pattern: '@/types/**', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],

      // その他
      'object-shorthand': 'error',

      'react/jsx-curly-brace-presence': 'error',

      // JSX props 並び替え（アルファベット順＋省略記法優先）
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          ignoreCase: true,
          multiline: 'last',
          shorthandFirst: true,
        },
      ],

      // 分割代入をソート
      'sort-destructure-keys/sort-destructure-keys': 'error',

      // 型のメンバー（interface/typeなど）をソート
      'typescript-sort-keys/interface': 'warn',

      'typescript-sort-keys/string-enum': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
