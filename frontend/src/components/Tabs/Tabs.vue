<template>
	<section>
		<v-sheet elevation="2">
			<v-tabs
				v-model="currentTab"
				color="primary"
				slider-color="indigo-lighten-4"
			>
				<v-tab
					v-for="tab in TABS"
					:key="`tab-${tab.value}`"
					:value="tab.value"
					>{{ tab.label }}</v-tab
				>
			</v-tabs>

			<v-divider></v-divider>

			<v-tabs-window v-model="currentTab">
				<v-tabs-window-item
					v-for="tab in TABS"
					:key="`tab-window-${tab.value}`"
					:value="tab.value"
				>
					<v-sheet class="pa-5">
						<component :is="tab.component" />
					</v-sheet>
				</v-tabs-window-item>
			</v-tabs-window>
		</v-sheet>
	</section>
</template>

<script setup lang="ts">
import { TabStore } from '@/stores/tabStore'

import { TABS } from './constants'

const currentTab = TabStore.get()
</script>

<style scoped>
section {
	grid-area: tabs;
}
</style>
