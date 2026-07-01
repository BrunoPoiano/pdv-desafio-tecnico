import type z from 'zod'

export function parseSchemaArray<T>(value: unknown, schema: z.ZodObject): T[] {
	if (!Array.isArray(value)) {
		return []
	}

	return value.reduce<T[]>((acc, line) => {
		const item = schema.safeParse(line)
		if (item.success) {
			acc.push(item.data as T)
		} else {
			console.error(item)
		}
		return acc
	}, [])
}

export function parseSchemaObj<T>(
	value: unknown,
	schema: z.ZodObject,
	defaultValue: T
): T {
	const item = schema.safeParse(value)
	if (item.success) {
		return item.data as T
	}

	return defaultValue
}
