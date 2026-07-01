<template>
	<v-data-table
		fixed-header
		:headers="header"
		height="600px"
		item-key="name"
		:items="contentComputed"
	>
		<template #item.address="{ item }">
			<a
				:style="{ cursor: 'pointer' }"
				variant="tonal"
				@click="openDialogString(item.address)"
			>
				{{ formatLongString(item.address) }}
			</a>
		</template>

		<template #item.fuels="{ item }">
			<a
				:style="{ cursor: 'pointer' }"
				variant="tonal"
				@click="openDialogString(item.fuels)"
			>
				{{ formatLongString(item.fuels) }}
			</a>
		</template>

		<template #item.notes="{ item }">
			<template v-if="item.notes">
				<a
					:style="{ cursor: 'pointer' }"
					variant="tonal"
					@click="openDialogString(item.notes)"
				>
					{{ formatLongString(item.notes) }}
				</a>
			</template>
		</template>
	</v-data-table>

	<address-dialog
		v-if="dialogContent"
		v-model="dialog"
		:content="dialogContent"
	/>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'

import type { Station } from '@/types'

import { header } from './header'
const AddressDialog = defineAsyncComponent(
	() => import('./components/infoDialog.vue')
)

defineOptions({
	inheritAttrs: false
})
type Props = {
	content: Station[]
}

const props = defineProps<Props>()
const dialog = ref(false)
const dialogContent = ref<string>()

const contentComputed = computed(() =>
	props.content.map((el) => {
		return {
			...el,
			address: formatAddress(el.address)
		}
	})
)

function formatLongString(item: string) {
	return item.length > 10 ? item.slice(0, 10) + '...' : item
}

function formatAddress(address: Station['address']) {
	return `${address.number} ${address.street}, ${address.neighborhood},
  ${address.city} - ${address.state},
  ${address.complement},
  ${address.zip_code}`
}

function openDialogString(value: string) {
	dialogContent.value = value
	dialog.value = true
}
</script>
