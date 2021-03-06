import { Env } from '@config/environment';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

	const authToken = request.headers.authorization;

	if(!authToken){
		return response.status(401).json({
			message: 'Unauthorized - token is missing.'
		});
	}

	const [, token] = authToken.split(' ');
    
	try {
		await verify(token, Env.SECRETTOKEN);
		return next();

	} catch (error) {
		return response.status(401).json({
			message: 'Invalid Token'
		});
	}

    
}