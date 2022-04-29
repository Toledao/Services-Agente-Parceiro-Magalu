import { Request, Response } from 'express';
import { IAuthCodigoRequestDTO, IDefaultResponseDTO, IEnviarEmailRequestDTO } from './redefinirSenhaDTO';
import { RedefinirSenhaUseCase } from './redefinirSenhaUseCase';


export class RedefinirSenhaController {

	constructor(
		private readonly redefinirSenha: RedefinirSenhaUseCase
	) { }

	public async enviarEmail(request: Request, response: Response) {

		const { email } = request.body;

		try {

			await this.redefinirSenha.enviarEmail(<IEnviarEmailRequestDTO>{ email });

			return response.send(201).json(<IDefaultResponseDTO>{ success: true });

		}
		catch (error) {

			return response.send(400).json(<IDefaultResponseDTO>{ success: false });
		}
	}

	public async authCodigo(request: Request, response: Response) {

		const { codigo, email } = request.body;

		try {

			const result = await this.redefinirSenha.auth(<IAuthCodigoRequestDTO>{ codigo, email });
			const status = result ? 200 : 400;

			return response.send(status).json(<IDefaultResponseDTO>{ success: result });

		}
		catch (error) {

			return response.send(400).json(<IDefaultResponseDTO>{ success: false });
		}
	}

}