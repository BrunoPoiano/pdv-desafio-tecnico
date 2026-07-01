import type { HealthCheck } from '@/types'
import { axiosInstance } from '@/utilities/axios'
import { parseSchemaObj } from '@/utilities/schemaParser'

import { BackendHealthSchema } from './schema'

export async function checkBackendHealth() {
	const response = await axiosInstance.get('health/')

	return parseSchemaObj<HealthCheck>(response.data, BackendHealthSchema, {
		app: '',
		message: '',
		node: ''
	})
}
