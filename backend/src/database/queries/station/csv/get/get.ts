import { CSV_STATION_SELECT } from './query'
import { QueryError } from '../../../../../errors/appError'
import { UploadStationCsv } from '../../../../../types/station/csv'
import { pool } from '../../../../database'

export async function getCsvJson() {
	const client = await pool.connect()

	try {
		const result = await client.query<UploadStationCsv>(CSV_STATION_SELECT)

		return result.rows
	} catch (err) {
		console.error(err)
		throw new QueryError('Erro buscando data csv')
	}
}
