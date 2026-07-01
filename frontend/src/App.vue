<template>
	<v-app>
		<v-main class="ma-3 appBody">
			<h1 class="text-headline-medium ma-0">PDV Desafio Tecnico</h1>
			<Import />
			<Tabs />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import Import from '@/components/Import/Import.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
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
