import { ref, watch } from 'vue'

import type { Themes } from '@/components/Tabs/constants'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/utilities/localStorage'

const theme = ref<Themes>(
	getDataFromLocalStorage({
		key: 'theme',
		initialValue: 'dark',
		parseFunction: (e) => (e === 'light' ? 'light' : 'dark')
	})
)

watch(theme, () => ThemeStore.save())

export const ThemeStore = {
	get() {
		return theme
	},
	save() {
		saveDataToLocalStorage({
			initialValue: theme.value,
			key: 'theme'
		})
	}
}
