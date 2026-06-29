import { PoolClient } from 'pg'

export default async function bulkUpsertFuels(
	client: PoolClient,
	fuels: string[]
) {
	const result = await client.query<{ id: number; name: string }>(
		`
    INSERT    INTO fuels (name)
    SELECT    UNNEST($1::TEXT[])
    ON        CONFLICT (name) DO
    UPDATE
    SET       name = EXCLUDED.name
    RETURNING id,
              name;
    `,
		[fuels]
	)

	const map = new Map<string, number>()
	for (const row of result.rows) {
		map.set(row.name, row.id)
	}

	return map
}
