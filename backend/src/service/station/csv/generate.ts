import { Transform } from 'node:stream'
import { getStreamedCsvJson } from '../../../database/queries/station/csv/get/getStream'
import { csvHeader } from './constants'

export async function generateCsv() {
	const passthrough = new Transform({
		readableObjectMode: false,
		writableObjectMode: true,
		transform(row: Record<string, unknown>, _, callback) {
			const line = csvHeader.map((h) => escapeCsv(row[h])).join(';')
			this.push(line + '\n')
			callback()
		}
	})

	passthrough.push(csvHeader.join(';') + '\n')

	getStreamedCsvJson((row) => passthrough.write(row))
		.then(() => passthrough.end())
		.catch((err) => passthrough.destroy(err))

	return passthrough
}

function escapeCsv(value: unknown): string {
	if (value == null) return ''

	const str = String(value)

	if (/[";,\n\r]/.test(str)) {
		return `"${str.replace(/"/g, '""')}"`
	}

	return str
}
