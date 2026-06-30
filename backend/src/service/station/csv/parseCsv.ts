import {
	FixedStationCsvData,
	UploadStationCsv
} from '../../../types/station/csv'
import { readCsv } from '../../../utilities/csv'
import { saveStationCsvData } from '../queryActions'
import { IMPORT_BATH_SIZE } from './constants'
import { fixCsvData } from './helper'

export async function importCsvData(file: Express.Multer.File) {
	const errors = new Map<string, string[]>()
	const added = { value: 0 }

	await readCsv<UploadStationCsv, FixedStationCsvData>({
		file,
		separator: ';',
		batchSize: IMPORT_BATH_SIZE,
		parseFunction: (cvdata, bach) => fixCsvData(cvdata, bach, added, errors),
		onBatch: async (batch) => {
			await saveStationCsvData(batch)
		}
	})

	return [added.value, parseErrors(errors)] as const
}

function parseErrors(errors: Map<string, string[]>) {
	const items = [...errors].map((item) => {
		return { linha: item[0], erros: item[1] }
	})

	return items
}
