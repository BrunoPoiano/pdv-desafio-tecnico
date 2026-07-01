<template>
	<teleport to="body">
		<v-dialog v-model="dialog" max-height="600" max-width="400" persistent>
			<v-card title="Status de Importação">
				<v-card-text style="padding-bottom: 5px">
					{{ props.content.massage }}
				</v-card-text>

				<v-list>
					<v-list-item
						v-for="erro in props.content.erros"
						:key="erro.linha"
						:title="`Linha ${erro.linha}:`"
					>
						<div v-for="e in erro.erros" :key="e" class="errosDiv">
							{{ e }}
						</div>
					</v-list-item>
				</v-list>

				<template #actions>
					<v-spacer></v-spacer>
					<v-btn @click="dialog = false"> Entendi </v-btn>
				</template>
			</v-card>
		</v-dialog>
	</teleport>
</template>

<script setup lang="ts">
import type { InsertResponse } from '@/types'

type Props = {
	content: InsertResponse
}

const dialog = defineModel<boolean>()
const props = defineProps<Props>()
</script>

<style scoped>
.errosDiv {
	margin-left: 0.8rem;
}
</style>
