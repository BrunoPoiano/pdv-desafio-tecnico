<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const DialogBackendHealth = defineAsyncComponent(
	() => import('./component/dialogBackendHealth.vue')
)
</script>

<template>
	<header>
		<h1 class="text-headline-medium ma-0">PDV Desafio Tecnico</h1>

		<dialog-backend-health />
	</header>
</template>

<style scoped>
header {
	grid-area: header;
	display: flex;
	gap: 1rem;
	align-items: center;
	justify-content: space-between;
}
</style>
