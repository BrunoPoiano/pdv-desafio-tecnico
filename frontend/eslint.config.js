import tsParser from '@typescript-eslint/parser'
import { globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import vuetify from 'eslint-config-vuetify'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import vueParser from 'vue-eslint-parser'
export default [
	...vuetify,
	prettier,

	globalIgnores([
		'**/dist/**',
		'**/node_modules/**',
		'**/dist-ssr/**',
		'**/coverage/**'
	]),
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser
			}
		}
	},

	{
		files: ['**/*.{ts,tsx,d.ts}'],
		languageOptions: {
			parser: tsParser
		}
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'sort-imports': 'off',
			'import/order': 'off',
			'perfectionist/sort-imports': 'off',

			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error'
		}
	},
	{
		name: 'app/no-unused-imports',
		rules: {
			'no-unused-vars': 'off'
		}
	}
]
