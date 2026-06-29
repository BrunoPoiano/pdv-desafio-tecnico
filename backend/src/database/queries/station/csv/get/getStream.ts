import QueryStream from 'pg-query-stream'
import { pool } from '../../../../database'
import { CSV_STATION_SELECT } from './query'
import { EXPORT_BATH_SIZE } from '../../../../../service/station/csv/constants'

export async function getStreamedCsvJson(
	onRow: (row: Record<string, unknown>) => void
) {
	const client = await pool.connect()

	return new Promise((resolve, reject) => {
		const qs = new QueryStream(CSV_STATION_SELECT, [], {
			batchSize: EXPORT_BATH_SIZE
		})
		const stream = client.query(qs)

		stream.on('data', onRow)
		stream.on('end', () => {
			client.release()
			resolve('finished')
		})
		stream.on('error', (err) => {
			client.release()
			reject(err)
		})
	})
}
