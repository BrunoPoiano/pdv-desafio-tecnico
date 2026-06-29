import { QueryError } from '../../../../../errors/appError'
import type { FixedStationCsvData } from '../../../../../types/station/csv'
import { pool } from '../../../../database'

import builk from './bulk'

export async function saveStationCsv(csv: FixedStationCsvData[]) {
	const client = await pool.connect()

	try {
		await client.query('BEGIN')

		const flat = builk.flatItems(csv)

		const fuelMap = await builk.bulkUpsertFuels(client, flat.fuels)

		const responsibleMap = await builk.bulkUpsertResponsible(
			client,
			flat.responsible
		)
		const addressMap = await builk.bulkUpsertAddresses(
			client,
			flat.addresses.map((a) => a[1])
		)

		const stationMap = await builk.bulkInsertStations(client, flat.stations, {
			fuel: fuelMap,
			responsible: responsibleMap,
			address: addressMap
		})

		await builk.bulkInsertStationFuels(
			client,
			flat.stations,
			stationMap,
			fuelMap
		)

		await client.query('COMMIT')
	} catch (e) {
		await client.query('ROLLBACK')
		console.error(e)
		throw new QueryError('Erro salvando dados')
	} finally {
		client.release()
	}
}
