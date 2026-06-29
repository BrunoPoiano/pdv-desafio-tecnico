import { PoolClient } from 'pg'
import { StationAddress } from '../../../../../../types/types'

export default async function bulkUpsertAddresses(
	client: PoolClient,
	rows: Omit<StationAddress, 'id'>[]
) {
	const result = await client.query<StationAddress>(
		`
    INSERT    INTO station_address (
              street,
              number,
              complement,
              neighborhood,
              city,
              state,
              zip_code,
              updated_at
              )
    SELECT    *, NOW()
    FROM      UNNEST(
              $1::TEXT[],
              $2::TEXT[],
              $3::TEXT[],
              $4::TEXT[],
              $5::TEXT[],
              $6::TEXT[],
              $7::TEXT[]
              )
    ON        CONFLICT (
    state,
    city,
    zip_code,
    street,
    neighborhood,
    number
    ) DO
    UPDATE
    SET       complement = EXCLUDED.complement,
              updated_at = NOW()
    RETURNING id,
              state,
              city,
              zip_code,
              street,
              neighborhood,
              number;
    `,
		[
			rows.map((r) => r.street),
			rows.map((r) => r.number),
			rows.map((r) => r.complement),
			rows.map((r) => r.neighborhood),
			rows.map((r) => r.city),
			rows.map((r) => r.state),
			rows.map((r) => r.zip_code)
		]
	)

	const map = new Map<string, number>()
	for (const row of result.rows) {
		const key = generateAddressKey(row)
		map.set(key, row.id)
	}

	return map
}

export function generateAddressKey(row: Omit<StationAddress, 'id'>) {
	return [
		row.state,
		row.city,
		row.zip_code,
		row.street,
		row.neighborhood,
		row.number
	].join('|')
}
