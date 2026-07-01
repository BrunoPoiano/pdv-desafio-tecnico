export async function TryCatch<T, E extends Error>(func: Promise<T>) {
	try {
		const value = await func

		return [value, null] as const
	} catch (error) {
		return [null, error as E] as const
	}
}
