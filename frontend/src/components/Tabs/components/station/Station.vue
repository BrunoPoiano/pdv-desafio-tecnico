<template>
	<Table :content="content" />
</template>
<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'

import { getStationList } from '@/services/Station/requests'
import { signal } from '@/stores/signal'
import type { Station } from '@/types'
import { TryCatch } from '@/utilities/tryCatch'
const Table = defineAsyncComponent(() => import('./components/Table/Table.vue'))

const content = ref<Station[]>([])

async function getContent() {
	const [data, err] = await TryCatch(getStationList())
	if (err) {
		console.error(err)
		return
	}

	content.value = data
}

watch(signal, () => {
	getContent()
})

onMounted(async () => {
	getContent()
})
</script>
