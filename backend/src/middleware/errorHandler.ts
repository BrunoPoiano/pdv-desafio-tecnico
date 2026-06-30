import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/appError'
import multer from 'multer'

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.error(err.message)

	if (err instanceof AppError) {
		return next(
			res.status(err.status).json({
				error: err.message
			})
		)
	}

	if (err instanceof multer.MulterError) {
		return next(
			res.status(400).json({
				error: err.message
			})
		)
	}

	if (err.message === 'Unexpected end of form') {
		return next(
			res.status(400).json({
				error: 'Malformed multipart/form-data request.'
			})
		)
	}

	return next(
		res.status(500).json({
			error: 'Internal server error'
		})
	)
}
