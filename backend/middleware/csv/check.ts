import { Request, Response, NextFunction } from 'express'
import { ValidationError } from '../../errors/appError'
import { removeFile } from '../../utilities/csv'

export function CheckCsv(req: Request, res: Response, next: NextFunction) {
	if (!req.file) {
		return next(new ValidationError('A file is required'))
	}

	if (req.file.mimetype !== 'text/csv') {
		removeFile(req.file)
		return next(new ValidationError('File must be csv'))
	}

	next()
}
