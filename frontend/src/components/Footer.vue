<template>
	<footer>
		<v-btn @click="changeTheme">Mudar Tema</v-btn>
	</footer>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify'

import { ThemeStore } from '@/stores/theme'

const theme = useTheme()
const savedTheme = ThemeStore.get()
function changeTheme() {
	theme.toggle()
	savedTheme.value = savedTheme.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
footer {
	grid-area: footer;
}
</style>
