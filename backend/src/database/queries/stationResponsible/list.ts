import { QueryError } from '../../../errors/appError'
import { StationResponsible } from '../../../types/types'
import { pool } from '../../database'

export async function listStationResponsible() {
	const client = await pool.connect()

	try {
		const result = await client.query<StationResponsible>(`
		SELECT    station_responsible.*,
              COUNT(s.id)           AS quantity_station
    FROM      station_responsible
    LEFT JOIN stations s ON s.responsible_person_id = station_responsible.id
    GROUP BY  s.responsible_person_id,
              station_responsible.id
    ORDER BY  station_responsible.id
      `)

		return result.rows
	} catch (err) {
		console.error(err)
		throw new QueryError('Erro buscando responsaveis')
	} finally {
		client.release()
	}
}
