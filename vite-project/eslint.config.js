import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import { Linter } from 'eslint';
import parser from '@typescript-eslint/parser'; // Импорт парсера

/** @type {Linter.FlatConfig} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: globals.browser,
      parser: parser, // Используем сам объект парсера
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
      '@typescript-eslint': tseslint,
    },
    rules: {
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      pluginJs.configs.recommended,
      'plugin:@typescript-eslint/recommended',
      pluginReact.configs.recommended,
    ],
  },
];
