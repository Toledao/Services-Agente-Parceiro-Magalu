import 'express-async-errors';
import { NextFunction, Request, Response } from 'express';

export function ErrorHandling(error: Error, request: Request, response: Response, next: NextFunction) {
	return response.status(400).json({
		status: 'Error',
		message: error.message,
	});
}