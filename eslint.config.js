import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import prettier from '@vue/eslint-config-prettier'

export default defineConfig([
  // 1. 基础配置：文件匹配、忽略项、全局变量
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },

  // 2. 引入推荐规则集（先引入基础规则，再引入框架规则）
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // 3. 自定义规则（放在推荐规则之后，可覆盖默认规则）
  {
    rules: {
      'prettier/prettier': [
        'warn',
        {
          singleQuote: true,
          semi: false,
          printWidth: 80,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ],
      'vue/multi-word-component-names': ['warn', { ignores: ['index'] }],
      'vue/no-setup-props-destructure': 'off',
      'no-undef': 'error'
    }
  },

  // 4. Prettier 配置（放在最后，确保覆盖冲突规则）
  prettier
])
