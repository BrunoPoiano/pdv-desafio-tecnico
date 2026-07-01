import { type Component, defineAsyncComponent } from 'vue'

const Responsible = defineAsyncComponent(
	() => import('./components/responsible/Responsible.vue')
)
const Station = defineAsyncComponent(
	() => import('./components/station/Station.vue')
)

type Tabs = Array<{
	value: string
	label: string
	component: Component
}>

export type TabValues = (typeof TABS)[number]['value']
export type Themes = 'dark' | 'light'

export const TABS = [
	{
		value: 'station',
		label: 'Postos',
		component: Station
	},
	{
		value: 'responsible',
		label: 'Responsaveis',
		component: Responsible
	}
] as const satisfies Tabs
