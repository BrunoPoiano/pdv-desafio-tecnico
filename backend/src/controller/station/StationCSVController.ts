import { NextFunction, Request, Response } from 'express'
import { importCsvData } from '../../service/station/csv/parseCsv'

import { getParsedCsvData } from '../../service/station/queryActions'

export class StationCSVController {
	static async import(req: Request, res: Response) {
		const [added, errors] = await importCsvData(req.file!)

		if (errors.length > 0) {
			res.status(200).json({
				adicionados: added,
				erros: errors
			})
			return
		}

		res.status(200).json({
			massage: 'Dados salvos com sucesso!'
		})
	}
	static async list(req: Request, res: Response) {
		const data = await getParsedCsvData()

		res.status(200).json({
			data
		})
	}
	static async download(req: Request, res: Response, next: NextFunction) {
		res.status(200).json({
			message: 'download'
		})
	}
}
