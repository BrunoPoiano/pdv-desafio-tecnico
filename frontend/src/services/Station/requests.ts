import type { InsertResponse, Station } from '@/types'
import { axiosInstance } from '@/utilities/axios'
import { parseSchemaArray, parseSchemaObj } from '@/utilities/schemaParser'

import { InsertSchema, StationSchema } from './schema'

export async function uploadCsv(file: File) {
	const fd = new FormData()
	fd.append('file', file)
	const response = await axiosInstance.post('station/csv', fd)

	return parseSchemaObj<InsertResponse>(response.data, InsertSchema, {
		massage: 'erro lendo dados',
		erros: []
	})
}

export async function getStationList() {
	const response = await axiosInstance.get('station/')
	return parseSchemaArray<Station>(response.data.data, StationSchema)
}

export async function getStationCsv() {
	return axiosInstance.get('station/csv/download', {
		responseType: 'blob'
	})
}
