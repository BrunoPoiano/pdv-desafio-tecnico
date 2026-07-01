import { NextFunction, Request, Response } from 'express'
import { importCsvData } from '../../service/station/csv/parseCsv'

import { removeFile } from '../../utilities/csv'
import { getParsedCsvData } from '../../service/station/queryActions'
import { generateCsv } from '../../service/station/csv/generate'
import { QueryError } from '../../errors/appError'

export class StationCSVController {
	static async import(req: Request, res: Response) {
		const [added, errors] = await importCsvData(req.file!).finally(() =>
			removeFile(req.file!)
		)

		res.status(200).json({
			massage:
				errors.length > 0
					? `Adicionados: ${added}`
					: 'Dados salvos com sucesso!',
			erros: errors
		})
	}
	static async list(req: Request, res: Response) {
		const data = await getParsedCsvData()

		res.status(200).json({
			data
		})
	}
	static async download(req: Request, res: Response, next: NextFunction) {
		res.setHeader('Content-Type', 'text/csv; charset=utf-8')
		res.setHeader('Content-Disposition', 'attachment; filename="stations.csv"')

		const streamedScv = await generateCsv()

		streamedScv.on('error', (err) => {
			console.error('CSV export stream error:', err)
			if (!res.headersSent) {
				next(new QueryError('Erro ao exportar CSV'))
			} else {
				res.destroy(err)
			}
		})

		streamedScv.pipe(res)
	}
}
