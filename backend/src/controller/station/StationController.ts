import { Request, Response } from 'express'

import { getListStations } from '../../service/station/queryActions'

export class StationController {
	static async list(req: Request, res: Response) {
		const data = await getListStations()

		res.status(200).json({
			data
		})
	}
}
