import type { StationResponsible } from '@/types'
import { axiosInstance } from '@/utilities/axios'
import { parseSchemaArray } from '@/utilities/schemaParser'

import { ResponsibleSchema } from './schema'

export async function getResponsibleList() {
	const response = await axiosInstance.get('responsible')

	if ('data' in response.data) {
		return parseSchemaArray<StationResponsible>(
			response.data.data,
			ResponsibleSchema
		)
	}

	return []
}
