import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      semi: ['error', 'never'], // 不要分號
      quotes: ['error', 'single'], // 單引號
      indent: ['error', 2], // 兩格縮排
      'comma-dangle': ['error', 'never'], // 最後不要逗號
      'no-unused-vars': 'warn', // 未使用變數警告
      'vue/multi-word-component-names': 'off', // 關閉 Vue 組件名稱必須多字的規則
    },
  },
  pluginVue.configs['flat/essential'],
])
