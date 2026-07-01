import { getCsvJson } from '../../../database/queries/station/csv/get/get'
import { listStations } from '../../../database/queries/station/list'

export async function getParsedCsvData() {
	return await getCsvJson()
}

export async function getListStations() {
	return await listStations()
}
