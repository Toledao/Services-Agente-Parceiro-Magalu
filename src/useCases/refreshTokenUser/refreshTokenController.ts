import { Request, Response } from 'express';
import { RefreshTokenUseCase } from './refreshTokenUseCase';

export class RefreshTokenController{

	constructor(
		private refreshTokenUseCase: RefreshTokenUseCase
	) {}

	async handle(request: Request, response: Response){
		const { refreshToken } = request.body;
		
		const token = await this.refreshTokenUseCase.execute({refreshToken});

		return response.json(token);        
	}
    
}