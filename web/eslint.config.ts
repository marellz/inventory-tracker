import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting, { rules } from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs({
  files: ['**/*.{ts,mts,tsx,vue}'],
  ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  ...pluginVue.configs['flat/essential'],
  ...vueTsConfigs.recommended,
  ...skipFormatting,
  rules: {
    ...rules,
    'vue/multi-word-component-names': 'off',
  },
})
