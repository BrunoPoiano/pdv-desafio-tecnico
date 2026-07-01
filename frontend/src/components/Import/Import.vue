<script setup lang="ts">
import { ref } from 'vue'

import { uploadCsv } from '@/services/Station/requests'
import { useSignal } from '@/stores/signal'
import type { InsertResponse } from '@/types'
import { TryCatch } from '@/utilities/tryCatch'

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
</script>
<template>
	<div class="wrapper">
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
