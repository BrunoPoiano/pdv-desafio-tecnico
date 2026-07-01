<template>
	<v-data-table
		fixed-header
		:headers="header"
		height="600px"
		item-key="name"
		:items="props.content"
	></v-data-table>
</template>
<script setup lang="ts">
import type { StationResponsible } from '@/types'

import { header } from './header'

type Props = {
	content: StationResponsible[]
}

const props = defineProps<Props>()

defineOptions({
	inheritAttrs: false
})
</script>
