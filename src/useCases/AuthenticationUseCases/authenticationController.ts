import { Request, Response } from 'express';
import { AuthenticationUseCase } from './authenticationUseCase';

export class AuthenticationController {

	constructor(
		private authenticationUseCase: AuthenticationUseCase
	) {}
	

	async handle(request: Request, response: Response){

		const { email, senha } = request.body;
        
		const token = await this.authenticationUseCase.execute({
			email,
			senha
		});
        
		return response.json(token);
        
	}
    
}