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
		      to_char(s.inauguration_date, 'DD/MM/YYYY') as inauguration_date,
          row_to_json (sa) AS address,
          string_agg       (
          f.name,
          ', '
          ORDER BY  f.name
          ) AS fuels
FROM      stations s
LEFT JOIN station_address sa ON sa.id = s.address_id
LEFT JOIN station_fuels sf ON sf.station_id = s.id
LEFT JOIN fuels f ON sf.fuel_id = f.id
GROUP BY  s.id,
          sa.*
      `)

		return result.rows
	} catch (err) {
		console.error(err)
		throw new QueryError('Erro buscando estacoes')
	}
}
