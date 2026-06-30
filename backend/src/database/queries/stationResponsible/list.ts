import { QueryError } from '../../../errors/appError'
import { StationResponsible } from '../../../types/types'
import { pool } from '../../database'

export async function listStationResponsible() {
	const client = await pool.connect()

	try {
		const result = await client.query<StationResponsible>(`
		select * from station_responsible
      `)

		return result.rows
	} catch (err) {
		console.error(err)
		throw new QueryError('Erro buscando responsaveis estacoes')
	} finally {
		client.release()
	}
}
