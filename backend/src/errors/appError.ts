export class AppError extends Error {
	constructor(
		public status: number,
		message: string
	) {
		super(message)
	}
}

export class ValidationError extends AppError {
	constructor(message: string) {
		super(400, message)
	}
}

export class QueryError extends AppError {
	constructor(message: string) {
		super(500, message)
	}
}
