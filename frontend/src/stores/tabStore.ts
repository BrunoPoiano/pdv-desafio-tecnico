import { ref, watch } from 'vue'

import type { TabValues } from '@/components/Tabs/constants'
import {
	getDataFromLocalStorage,
	saveDataToLocalStorage
} from '@/utilities/localStorage'

const currentTab = ref<TabValues>(
	getDataFromLocalStorage({
		key: 'tab',
		initialValue: 'station'
	})
)

watch(currentTab, () => TabStore.save())

export const TabStore = {
	get() {
		return currentTab
	},
	save() {
		saveDataToLocalStorage({
			initialValue: currentTab.value,
			key: 'tab'
		})
	}
}
