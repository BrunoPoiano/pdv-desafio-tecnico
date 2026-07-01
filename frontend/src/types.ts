import type z from 'zod'

import type { BackendHealthSchema } from './services/Backend/schema'
import type { ResponsibleSchema } from './services/Responsible/schema'
import type { InsertSchema, StationSchema } from './services/Station/schema'

export type LocalStorageKeys = 'tab' | 'theme'
export type InsertResponse = z.infer<typeof InsertSchema>
export type StationResponsible = z.infer<typeof ResponsibleSchema>
export type Station = z.infer<typeof StationSchema>
export type HealthCheck = z.infer<typeof BackendHealthSchema>

export type TableHeader<T> = {
	title: string
	value: keyof T
}[]
