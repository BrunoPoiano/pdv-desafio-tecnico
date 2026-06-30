import { Request, Response } from 'express'

import { getListStationResponsible } from '../service/responsible/queryActions'

export class ResponsibleController {
	static async list(req: Request, res: Response) {
		const data = await getListStationResponsible()

		res.status(200).json({
			data
		})
	}
}
