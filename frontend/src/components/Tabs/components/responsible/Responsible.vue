<template>
	<Table :content="content" />
</template>
<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref, watch } from 'vue'

import { getResponsibleList } from '@/services/Responsible/requests'
import { signal } from '@/stores/signal'
import type { StationResponsible } from '@/types'
import { TryCatch } from '@/utilities/tryCatch'
const Table = defineAsyncComponent(() => import('./components/Table.vue'))

const content = ref<StationResponsible[]>([])

async function getContent() {
	const [data, err] = await TryCatch(getResponsibleList())
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
