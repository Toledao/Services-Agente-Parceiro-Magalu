import { Request, Response } from 'express';
import { IAuthCodigoRequestDTO, IDefaultResponseDTO } from './redefinirSenhaDTO';
import { RedefinirSenhaUseCase } from './redefinirSenhaUseCase';


export class RedefinirSenhaController {

	constructor(
		private redefinirSenha: RedefinirSenhaUseCase
	) { }

	public async enviarCodigoEmail(request: Request, response: Response) {

		const { email } = request.body;

		try {

			await this.redefinirSenha.enviarEmail({ email });

			return response.status(201).json(<IDefaultResponseDTO>{ success: true });

		}
		catch (error) {

			return response.status(400).json(<IDefaultResponseDTO>{ success: false });
		}
	}

	public async authCodigo(request: Request, response: Response) {

		const { codigo, email } = request.body;

		try {

			const result = await this.redefinirSenha.auth(<IAuthCodigoRequestDTO>{ codigo, email });
			const status = result === true ? 200 : 401;

			return response.status(status).json(<IDefaultResponseDTO>{ success: result });

		}
		catch (error) {

			return response.status(400).json(<IDefaultResponseDTO>{ success: false });
		}
	}

	public async redefinir(request: Request, response: Response) {
		const { email, senha } = request.body;

		try {

			const result = await this.redefinirSenha.redefinirSenha({ senha, email });
			const status = result === true ? 200 : 400;

			return response.status(status).json(<IDefaultResponseDTO>{ success: result });

		}
		catch (error) {

			return response.status(400).json(<IDefaultResponseDTO>{ success: false });
		}
	}

}