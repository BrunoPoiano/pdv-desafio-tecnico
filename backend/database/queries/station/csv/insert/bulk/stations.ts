import { PoolClient } from 'pg'
import { Stations } from './types'
import { Station } from '../../../../../../types/types'

export default async function bulkInsertStations(
	client: PoolClient,
	stations: Stations[],
	maps: {
		fuel: Map<string, number>
		responsible: Map<string, number>
		address: Map<string, number>
	}
) {
	const uniqueStations = Array.from(
		new Map(stations.map((s) => [s.station.cnpj, s])).values()
	)

	const result = await client.query<Station>(
		`
    INSERT    INTO stations (
              cnpj,
              legal_name,
              trade_name,
              brand,
              address_id,
              responsible_person_id,
              inauguration_date,
              nozzle_count,
              lane_count,
              status,
              notes,
              updated_at
              )
    SELECT    *, NOW()
    FROM      UNNEST(
              $1::TEXT[],
              $2::TEXT[],
              $3::TEXT[],
              $4::TEXT[],
              $5::INT[],
              $6::INT[],
              $7::date[],
              $8::INT[],
              $9::INT[],
              $10::stations_status[],
              $11::TEXT[]
              )
    ON        CONFLICT (cnpj) DO
    UPDATE
    SET       legal_name = EXCLUDED.legal_name,
              trade_name = EXCLUDED.trade_name,
              brand = EXCLUDED.brand,
              inauguration_date = EXCLUDED.inauguration_date,
              address_id = EXCLUDED.address_id,
              responsible_person_id = EXCLUDED.responsible_person_id,
              nozzle_count = EXCLUDED.nozzle_count,
              lane_count = EXCLUDED.lane_count,
              status = EXCLUDED.status,
              notes = EXCLUDED.notes,
              updated_at = NOW()
    RETURNING id,
              cnpj;
    `,
		[
			uniqueStations.map((s) => s.station.cnpj),
			uniqueStations.map((s) => s.station.legal_name),
			uniqueStations.map((s) => s.station.trade_name),
			uniqueStations.map((s) => s.station.brand),
			uniqueStations.map((s) => maps.address.get(s.addressKey)),
			uniqueStations.map((s) => maps.responsible.get(s.responsibleCpf)),
			uniqueStations.map((s) => s.station.inauguration_date),
			uniqueStations.map((s) => s.station.nozzle_count),
			uniqueStations.map((s) => s.station.lane_count),
			uniqueStations.map((s) => s.station.status),
			uniqueStations.map((s) => s.station.notes)
		]
	)

	const map = new Map<string, number>()
	for (const r of result.rows) {
		map.set(r.cnpj, r.id)
	}

	return map
}
