import { PoolClient } from 'pg'
import { StationResponsible } from '../../../../../../types/types'

export default async function bulkUpsertResponsible(
	client: PoolClient,
	rows: Omit<StationResponsible, 'id'>[]
) {
	const result = await client.query<StationResponsible>(
		`
    INSERT    INTO station_responsible (cpf, NAME, email, position, updated_at)
    SELECT    *, NOW()
    FROM      UNNEST($1::TEXT[], $2::TEXT[], $3::TEXT[], $4::TEXT[])
    ON        CONFLICT (cpf) DO
    UPDATE
    SET       NAME = EXCLUDED.name,
              email = EXCLUDED.email,
              position = EXCLUDED.position,
              updated_at = NOW()
    RETURNING id,
              cpf;
    `,
		[
			rows.map((r) => r.cpf),
			rows.map((r) => r.name),
			rows.map((r) => r.email),
			rows.map((r) => r.position)
		]
	)

	const map = new Map<string, number>()
	for (const r of result.rows) {
		map.set(r.cpf, r.id)
	}

	return map
}
