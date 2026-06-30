import { QueryError } from '../../../errors/appError'
import { Station, StationAddress } from '../../../types/types'
import { pool } from '../../database'

type StationList = Station & {
	address: StationAddress
}

export async function listStations() {
	const client = await pool.connect()

	try {
		const result = await client.query<StationList>(`
		SELECT    s.*,
          sr.name         AS responsible,
          ROW_TO_JSON(sa) AS address,
          STRING_AGG(
          f.name,
          ', '
          ORDER BY  f.name
          ) AS fuels
FROM      stations s
LEFT JOIN station_responsible sr ON sr.id = s.responsible_person_id
LEFT JOIN station_address sa ON sa.id = s.address_id
LEFT JOIN station_fuels sf ON sf.station_id = s.id
LEFT JOIN fuels f ON sf.fuel_id = f.id
GROUP BY  s.id,
          sr.name,
          sa.*
ORDER BY s.id
      `)

		return result.rows
	} catch (err) {
		console.error(err)
		throw new QueryError('Erro buscando estacoes')
	} finally {
		client.release()
	}
}
