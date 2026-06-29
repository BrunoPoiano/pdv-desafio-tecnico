import { PoolClient } from 'pg'
import { Stations } from './types'

export default async function bulkInsertStationFuels(
	client: PoolClient,
	stations: Stations[],
	stationMap: Map<string, number>,
	fuelMap: Map<string, number>
) {
	const stationIds: number[] = []
	const fuelIds: number[] = []

	for (const s of stations) {
		const stationId = stationMap.get(s.station.cnpj)!

		for (const f of s.fuels) {
			stationIds.push(stationId)
			const item = fuelMap.get(f)
			if (item) {
				fuelIds.push(item)
			}
		}
	}

	await client.query(
		`
    INSERT    INTO station_fuels (station_id, fuel_id)
    SELECT    *
    FROM      UNNEST($1::INT[], $2::INT[])
    ON        CONFLICT DO NOTHING
    `,
		[stationIds, fuelIds]
	)
}
