<template>
	<div class="text-center pa-4">
		<v-dialog v-model="dialog" max-width="400">
			<v-card :text="props.content"> </v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
type Props = {
	content: string
}
const dialog = defineModel<boolean>()
const props = defineProps<Props>()
</script>

<style scoped>
.errosDiv {
	margin-left: 0.8rem;
}
</style>
