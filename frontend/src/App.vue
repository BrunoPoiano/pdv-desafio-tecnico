<template>
	<v-app>
		<v-main class="ma-3 appBody">
			<Header />
			<Import />
			<Tabs />
			<Footer />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useTheme } from 'vuetify'

import Footer from '@/components/Footer.vue'
import Header from '@/components/Header/Header.vue'
import Import from '@/components/Import/Import.vue'
import Tabs from '@/components/Tabs/Tabs.vue'

import { ThemeStore } from './stores/theme'

const theme = useTheme()

onBeforeMount(() => {
	theme.change(ThemeStore.get().value)
})
</script>

<style scoped>
.appBody {
	display: grid;
	grid-template-rows: auto auto 1fr auto;
	gap: 1rem;

	grid-template-areas:
		'header '
		'import'
		'tabs'
		'footer';
}
</style>
