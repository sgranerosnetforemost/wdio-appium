import js from '@eslint/js';
import { configs as wdioConfig } from 'eslint-plugin-wdio';

export default [
    js.configs.recommended,
    wdioConfig['flat/recommended'],

    {
        files: ['test/**/*.js', 'wdio.conf.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                browser: 'readonly',
                driver: 'readonly',
                $: 'readonly',
                $$: 'readonly',
                expect: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly',
                after: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly'
            }
        },
        rules: {
            'wdio/no-pause': 'off'
        }
    }
];