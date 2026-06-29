import csv from 'csv-parser'
import fs from 'node:fs'

type Props<T, F> = {
	file: Express.Multer.File
	separator: string
	batchSize: number
	parseFunction: (value: T[], batchIndex: number) => F[]
	onBatch: (batch: F[]) => Promise<void>
}

export async function readCsv<T, F>({
	file,
	separator,
	batchSize,
	onBatch,
	parseFunction
}: Props<T, F>) {
	const stream = fs.createReadStream(file.path).pipe(
		csv({
			separator,
			mapHeaders: ({ header }) => header.replace(/^\uFEFF/, '')
		})
	)

	let batch: T[] = []
	let index = 0
	for await (const row of stream) {
		batch.push(row as T)

		if (batch.length === batchSize) {
			const parsed = parseFunction(batch, index)
			await onBatch(parsed)
			batch = []
			index++
		}
	}

	if (batch.length) {
		const parsed = parseFunction(batch, index)
		await onBatch(parsed)
	}
}

export function removeFile(file: Express.Multer.File) {
	fs.unlink(file.path, (err) => {
		if (err) {
			console.error(err)
		}
	})
}
