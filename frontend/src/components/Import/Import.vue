<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'

import { getStationCsv, uploadCsv } from '@/services/Station/requests'
import { useSignal } from '@/stores/signal'
import type { InsertResponse } from '@/types'
import { downloadFile } from '@/utilities/downloadFile'
import { TryCatch } from '@/utilities/tryCatch'

const ErrosDialog = defineAsyncComponent(
	() => import('./components/errosDialog.vue')
)

const file = ref<File>()
const response = ref<InsertResponse>()
const errorDialog = ref(false)

async function handleUpload() {
	if (!file.value || !file.value) {
		return
	}
	const [value, err] = await TryCatch(uploadCsv(file.value))

	if (err) {
		console.error(err)
		alert('Houve um erro buscando os dados')
		return
	}

	useSignal.trigger()
	response.value = value
	if (value.erros.length > 0) {
		errorDialog.value = true
		return
	}

	alert(value.massage)
}

async function handleDownload() {
	const response = await getStationCsv()
	downloadFile(response.data)
}
</script>
<template>
	<div class="wrapper">
		<v-btn color="teal-lighten-2" variant="tonal" @click="handleDownload">
			Download CSV
		</v-btn>

		<v-file-input
			v-model="file"
			accept=".csv"
			label="Busque arquivo"
			variant="solo-filled"
			@update:model-value="handleUpload"
		></v-file-input>

		<erros-dialog v-if="response" v-model="errorDialog" :content="response" />
	</div>
</template>

<style scoped>
.wrapper {
	grid-area: import;
	display: grid;
	gap: 1rem;

	button {
		justify-self: end;
	}
}
</style>
