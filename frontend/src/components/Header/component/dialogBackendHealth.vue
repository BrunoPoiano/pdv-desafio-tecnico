<template>
	<v-dialog max-width="500">
		<template #activator="{ props: activatorProps }">
			<v-btn
				v-bind="activatorProps"
				color="default"
				text="Verificar Backend"
				@click="handleCheck"
			></v-btn>
		</template>

		<template #default="{}">
			<v-card title="Backend">
				<v-card-text v-if="health">
					<div>App: {{ health.app }}</div>
					<div>Node: {{ health.node }}</div>
					<div>Mensagem: {{ health.message }}</div>
				</v-card-text>
			</v-card>
		</template>
	</v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { checkBackendHealth } from '@/services/Backend/requests'
import type { HealthCheck } from '@/types'
import { TryCatch } from '@/utilities/tryCatch'

const health = ref<HealthCheck>({ app: '', message: '', node: '' })

async function handleCheck() {
	const [response, err] = await TryCatch(checkBackendHealth())

	if (err) {
		console.error(err)
		health.value.message = 'Erro testando backend'
		return
	}

	health.value = response
}
</script>
